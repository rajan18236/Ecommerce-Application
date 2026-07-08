import { Eye, EyeOff, Mail, Lock, User, UserRound } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { authContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const { signUpUserData, setSignUpUserData, userRegistration } = useContext(authContext);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const result = await userRegistration();
    if (result.success) {
      setResult(result);
      setIsLoading(false);
      navigate("/");
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 mt-20">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-black text-white items-center justify-center p-10">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Join Our Store
            </h1>

            <p className="mt-5 text-gray-300">
              Create your account and start shopping from thousands of amazing
              products.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Fill in your information below.
          </p>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div>
              <label className="font-medium">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <User size={20} className="text-gray-400" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={signUpUserData.fullName}
                  onChange={(e) =>
                    setSignUpUserData({ ...signUpUserData, fullName: e.target.value })
                  }
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

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
                  value={signUpUserData.email}
                  onChange={(e) =>
                    setSignUpUserData({ ...signUpUserData, email: e.target.value })
                  }
                  className="w-full p-4 outline-none"
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
                  value={signUpUserData.password}
                  onChange={(e) =>
                    setSignUpUserData({ ...signUpUserData, password: e.target.value })
                  }
                  className="w-full p-4 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className=" font-medium">
                Choose Your Role
              </label>

              <div className="flex items-center border rounded-xl px-4 focus-within:ring-2 focus-within:ring-black">
                <UserRound size={20} className="text-gray-400 mr-3" />

                <select
                  name="role"

                  onChange={(e) =>
                    setSignUpUserData({ ...signUpUserData, role: e.target.value })
                  }
                  className="w-full py-4 outline-none bg-transparent cursor-pointer "
                  value={signUpUserData.role}
                >
                  <option value="customer">
                    Customer / Buyer
                  </option>

                  <option value="seller">
                    Vendor / Seller
                  </option>
                </select>
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

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl transition
  ${isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 text-white"
                }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <span className="text-black font-semibold cursor-pointer ml-2 hover:underline">
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;