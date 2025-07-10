"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Mock user data
const mockUsers = [
  {
    id: 1,
    email: "admin@wakafoody.com",
    password: "admin123",
    role: "superadmin",
  },
  { id: 2, email: "org@wakafoody.com", password: "org123", role: "orgadmin" },
  {
    id: 3,
    email: "staff@wakafoody.com",
    password: "staff123",
    role: "employee",
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "superadmin") {
        router.push("/admin");
      } else {
        router.push("/organization");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </main>
  );
}
