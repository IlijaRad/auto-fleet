"use client";

import { login } from "@/lib/actions/login";
import { useState } from "react";
import Input from "../components/input";
import Label from "../components/label";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ general?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          className="mt-2"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          className="mt-2"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="text-medium mt-8 h-9 w-full cursor-pointer rounded-md bg-indigo-600 px-3.5 text-sm text-white transition-colors hover:bg-indigo-800"
      >
        Log In
      </button>
      {errors.general && (
        <p
          aria-live="polite"
          className="mt-2 line-clamp-2 text-xs text-red-600"
        >
          {errors.general}
        </p>
      )}
    </form>
  );
}
