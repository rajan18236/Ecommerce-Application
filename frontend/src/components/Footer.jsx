import {
  FaFacebook ,
   FaInstagram  ,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaMapPin,
} from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-300 mt-16  bottom-0">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Ecommerce
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Discover quality products at the best prices.
              Shop with confidence and enjoy fast delivery,
              secure payments, and excellent customer support.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 duration-300"
              >
               <FaFacebook size={18}/>
              </a>

              <a
                href="#"
                className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 duration-300"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="p-2 rounded-full bg-zinc-800 hover:bg-orange-500 duration-300"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-orange-400 duration-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-orange-400 duration-300">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-orange-400 duration-300">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-orange-400 duration-300">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer duration-300">
                Contact Us
              </li>

              <li className="hover:text-orange-400 cursor-pointer duration-300">
                FAQs
              </li>

              <li className="hover:text-orange-400 cursor-pointer duration-300">
                Shipping Policy
              </li>

              <li className="hover:text-orange-400 cursor-pointer duration-300">
                Return Policy
              </li>

              <li className="hover:text-orange-400 cursor-pointer duration-300">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaMapPin size={18} />
                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone size={18} />
                <span>+977 98XXXXXXXX</span>
              </div>

              <div className="flex items-center gap-3">
               <GoMail size={18} />
                <span>support@shopease.com</span>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ecommerce. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <span className="hover:text-orange-400 cursor-pointer duration-300">
              Terms
            </span>

            <span className="hover:text-orange-400 cursor-pointer duration-300">
              Privacy
            </span>

            <span className="hover:text-orange-400 cursor-pointer duration-300">
              Cookies
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;