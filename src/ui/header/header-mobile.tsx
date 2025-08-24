import { IconCar } from "@tabler/icons-react";
import Link from "next/link";
import MobileMenuButton from "./mobile-menu-button";

export default function HeaderMobile() {
  return (
    <header className="bg-white lg:hidden border-b border-gray-200">
      <div className="px-4 sm:px-6">
        <div className="grid h-16 grid-cols-3 items-center">
          <div className="flex gap-x-6">
            <MobileMenuButton />
          </div>
          <Link
            href="/"
            className="flex gap-x-1.5 items-center mr-4 justify-self-center"
          >
            <IconCar className="size-8 stroke-[1.5] shrink-0 text-indigo-600" />
            <div className="text-gray-900/60 font-semibold">AutoFleet</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
