import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, useContext,useEffect } from "react";
import { authContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { loginUserData, setLoginUserData, userLogin, isUserLoggedIn } = useContext(authContext);


  const handleChange = (e) => {
    setLoginUserData({
      ...loginUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let result = await userLogin();
    if (result.success) {
      setResult(result);
      setIsLoading(false);
      navigate("/");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 mt-10 ">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Section */}
        <div className="p-10">

          <h2 className="text-3xl font-bold mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="font-medium">
                Email
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Mail size={20} className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  value={loginUserData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Lock size={20} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={loginUserData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            {result && (
              <div
                className={`mt-4 p-4 rounded-xl ${result.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {result.message}
              </div>
            )}
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">


              <button
                type="button"
                className="text-black font-medium hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full  text-white py-4 rounded-xl hover:bg-zinc-900 transition ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-black"}`}
              disabled={isLoading}
            >
              {isLoading ? "Login..." : "Login"}
            </button>

          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?
            <span className="ml-2 text-black font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>

        </div>


        {/* Right Section */}

        <div className="hidden md:flex bg-black text-white items-center justify-center p-10">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome Back
            </h1>

            <p className="mt-5 text-gray-300">
              Login to access your account, track orders, manage your wishlist,
              and continue shopping.
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;