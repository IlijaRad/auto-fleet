"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { USER_COOKIE_NAME } from "../definitions";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function login(email: string, password: string) {
  const cookieStore = await cookies();

  const data = schema.safeParse({
    email,
    password,
  });

  if (!data.success) {
    return { success: false, error: "Invalid credentials" };
  }

  if (email === "admin@autofleet.com" && password === "password") {
    const userData = JSON.stringify({ email, id: 1 });

    cookieStore.set({
      name: USER_COOKIE_NAME,
      value: userData,
      httpOnly: true,
      maxAge: 3 * 60 * 60,
      sameSite: "lax",
    });

    redirect("/");
  }

  return { success: false, error: "Invalid credentials" };
}
