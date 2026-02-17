import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Expense Tracker
        </h1>

        <div className="flex mb-6 border-b border-gray-600">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 pb-2 text-lg ${
              activeTab === "login"
                ? "border-b-2 border-green-500 text-green-400"
                : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 pb-2 text-lg ${
              activeTab === "register"
                ? "border-b-2 border-green-500 text-green-400"
                : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

      </div>
    </div>
  );
};

export default Login;
