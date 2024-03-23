import React, { useState } from 'react';

interface SignUpProps {}

interface SignUpState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: { [key: string]: string };
}

function SignUp({}: SignUpProps) {
  const [state, setState] = useState<SignUpState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    const errors = {} as { [key: string]: string };

    if (!state.username) {
      errors.username = 'Username is required';
    }

    if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = 'Invalid email address';
    }

    if (!state.password || state.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setState((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    // Simulate sign-up logic (replace with your actual authentication)
    console.log('Sign Up:', state);

    setState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={state.username}
          onChange={handleChange}
          required
          className={`px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            state.errors.username ? 'border-red-500' : ''
          }`}
        />
        {state.errors.username && (
          <span className="text-red-500 text-xs">{state.errors.username}</span>
        )}
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
          className={`px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            state.errors.email ? 'border-red-500' : ''
          }`}
        />
        {state.errors.email && (
          <span className="text-red-500 text-xs">{state.errors.email}</span>
        )}
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          required
          className={`px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            state.errors.password ? 'border-red-500' : ''
          }`}
        />
        {state.errors.password && (
          <span
