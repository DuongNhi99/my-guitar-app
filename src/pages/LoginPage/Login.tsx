

// src/pages/Login.tsx
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);		
      }
      navigate("/");
    } catch (err) {
      alert("Auth failed: " + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f1ee] dark:bg-[#22223b] px-4">
      <form onSubmit={handleAuth} className="w-full max-w-md bg-white dark:bg-[#4a4e69] p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-[#4a4e69] dark:text-[#f2e9e4] text-center">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md dark:bg-[#9a8c98] dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md dark:bg-[#9a8c98] dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#c9ada7] hover:bg-[#9a8c98] text-white py-2 rounded-md"
        >
          {isRegister ? "Sign Up" : "Login"}
        </button>
        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-center text-sm text-[#4a4e69] dark:text-[#f2e9e4] cursor-pointer underline"
        >
          {isRegister ? "Have an account? Login" : "New here? Sign up"}
        </p>
      </form>
    </div>
  );
}
