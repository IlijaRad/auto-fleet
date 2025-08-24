"use server";

import { cookies } from "next/headers";
import { USER_COOKIE_NAME } from "../definitions";
import { User } from "../types";

export async function getUser() {
  const cookieStore = await cookies();
  const userString = cookieStore.get(USER_COOKIE_NAME)?.value;

  let user = null;
  if (userString) user = JSON.parse(userString) as User;

  return user;
}
