"use client"
import React, { useState } from 'react';

interface SignInProps {}

interface SignInState {
  email: string;
  password: string;
}

function SignIn({}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simulate sign-in logic (replace with your actual authentication)
    console.log('Sign-in:', email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm mt-4"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
