import { useState } from "react";
import API from "../../utils/api";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.post("/auth/register", form);
      setMessage("Registration successful! Please login.");
    } catch {
      setError("User already exists.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {message && (
        <p className="text-green-400 text-sm text-center">{message}</p>
      )}

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-3 rounded bg-gray-700"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-gray-700"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 rounded bg-gray-700"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

