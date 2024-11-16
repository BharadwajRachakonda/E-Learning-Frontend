import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function Login({ user, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser({ id: data.id, name: data.name });
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <h1 className="text-5xl font-extrabold text-white mb-10">
        E-Learning Platform
      </h1>
      <form
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-gray-50"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg bg-gray-50"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:from-blue-700 hover:to-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
