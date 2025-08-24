"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { USER_COOKIE_NAME } from "../definitions";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIE_NAME);

  redirect("/login");
}
