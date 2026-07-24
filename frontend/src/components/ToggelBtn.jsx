import { useContext, useState } from "react";
import { productContext } from "../context/GlobalContext";

const ToggleSwitch = ({ checked, productId }) => {
    const [isBlocked, setIsBlocked] = useState(checked)
    const { disableProducts } = useContext(productContext)

    const handleCheckbox = async (productId) => {
        await disableProducts(productId, !checked)
    }
    return (
        <button onClick={() => {
            setIsBlocked(!checked)
            handleCheckbox(productId)
        }}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${isBlocked ? "bg-green-500" : "bg-gray-300"
                }`}
        >
            <span
                className={`h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isBlocked ? "translate-x-8" : "translate-x-1"
                    }`}
            />
        </button>
    );
};

export default ToggleSwitch;