import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "../../hooks/useAuth"; // ✅ make sure you have this

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      
      setUser(jwtDecode(res.data.token));
 
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-gray-700 text-white"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 rounded bg-gray-700 text-white"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-semibold"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;


