import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold">Expense Tracker</h1>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-400">Login</Link>
            <Link to="/register" className="hover:text-green-400">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
            <Link to="/explorer" className="hover:text-green-400">Explorer</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;