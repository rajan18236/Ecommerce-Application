import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Call Here
  };

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
            onSubmit={handleSubmit}
            className="space-y-5"
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
                  value={formData.fullName}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Button */}
            <button
              className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
            >
              Create Account
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