"use client";

import { login } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  // State to hold error messages
  const [error, setError] = useState("");
  const router = useRouter();

  // Function to handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const res = await login(formData);
      if (!!res.error) {
        setError(res.error.message);
      } else {
        router.push("/bookings");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      {error && <div className="text-xl text-red-600 text-center">{error}</div>}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  );
}
