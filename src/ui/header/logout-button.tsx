"use client";

import { logout } from "@/lib/actions/logout";
import { IconLogout } from "@tabler/icons-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      aria-label="Log out"
      className="-my-2 -ml-4 flex cursor-pointer items-center gap-x-2 rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100"
    >
      <IconLogout />
    </button>
  );
}
