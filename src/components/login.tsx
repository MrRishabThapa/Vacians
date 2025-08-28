import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // NEW
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! 🎉", { position: "top-right" });

      // Save username in localStorage (or you can use context/state)
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err: any) {
      toast.error(`Login failed: ${err.message}`, { position: "top-right" });
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-6">
      {/* background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className={`absolute text-xl md:text-2xl ${
              i % 2 === 0 ? "text-green-400" : "text-blue-500"
            } animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {i % 2 === 0 ? "🌿" : "💧"}
          </span>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-3xl font-extrabold text-green-300 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-green-200 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-green-400 text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-green-200 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-green-400 text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-green-200 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-green-400 text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-green-200 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-green-400 hover:underline font-semibold"
          >
            Sign up here
          </a>
        </p>
      </div>

      <ToastContainer />

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.7; }
        }
        .animate-float {
          position: absolute;
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
