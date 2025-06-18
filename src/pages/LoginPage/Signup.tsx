import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ee] dark:bg-[#22223b] flex items-center justify-center">
      <div className="bg-white dark:bg-[#4a4e69] p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">📝 Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signup} className="w-full bg-[#c9ada7] text-white p-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}
