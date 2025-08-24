"use client";

import { logout } from "@/lib/actions/logout";
import { Trigger } from "@radix-ui/react-dialog";

const MobileLogOutButton = () => {
  return (
    <Trigger
      className="mx-4 mt-6 block cursor-pointer rounded-md bg-indigo-600 py-2 font-medium text-white transition-colors hover:bg-indigo-800"
      onClick={() => logout()}
    >
      Log out
    </Trigger>
  );
};

export default MobileLogOutButton;
