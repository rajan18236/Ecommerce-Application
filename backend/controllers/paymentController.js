const { rawListeners } = require("../models/adminModel");
const productModel = require("../models/productModel")
const stripe = require("../config/stripeConfig")
const orderModel = require("../models/orderModel")

const createCheckoutSession = async (req, res) => {
    try {
        let { products } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: 'Invaild or empty product array' })
        }
        let totalAmount = 0;
        const lineItems = products.map(product => {
            const amount = Math.round(product.product.price * 100) //stripe wants u to send in format of cents 
            totalAmount += amount * product.productQty;

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.product.productName,
                        images: [product.product.image],
                    },
                    unit_amount: amount
                },
                quantity: product.productQty
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(
                    products.map(p => ({
                        id: p.product._id,
                        quantity: p.productQty,
                        price: p.product.price,
                    }))
                )
            }
        })
        res.status(200).json({
            success: true,
            message: "checkout sessions create successfully ",
            url: session.url,
            totalAmount: totalAmount / 100
        })
    } catch (error) {
        console.log("Error on CheckoutSession:", error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId, orderNo } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const existingOrder = await orderModel.findOne({
            stripeSessionId: session.id,
        });

        if (existingOrder) {
            return res.status(200).json({
                success: true,
                message: "Order already exists",
                orderId: existingOrder._id,
            });
        }
        if (session.payment_status === "paid") {
            const products = JSON.parse(session.metadata.products);
            const newOrder = await orderModel.create({

                userId: session.metadata.userId,
                products: products.map(product => ({
                    product: product.id,
                    price: product.price,
                    productQty: product.quantity
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId
            })
            res.status(200).json({
                success: true,
                message: 'Payment successful, order created',
                orderId: newOrder._id,
            })

            products.map(async (product) => {
                let p = await productModel.findById(product.id)
                if(!p){
                    return res.json({message:"product not found"})
                }
                p.stock -= product.quantity
                await p.save()
            })

        }
    } catch (error) {
        console.log("Error processing successful checkout:", error.message);
        res.status(500).json({
            success: false,
            message: 'Error processing successful checkout'
        })

    }
}

module.exports = { createCheckoutSession, checkoutSuccess }