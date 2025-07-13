

import { signIn } from "next-auth/react";

export async function login(formData) {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    // Check if login failed
    if (!res.ok) {
      return {
        error: { message: "Invalid email or password" },
      };
    }

    return res;
  } catch (e) {
    return {
      error: { message: e.message },
    };
  }
}
