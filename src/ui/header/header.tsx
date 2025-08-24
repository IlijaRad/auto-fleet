import { getUser } from "@/lib/actions/get-user";
import { navigation } from "@/lib/data/navigation";
import { IconCar, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default async function Header() {
  const user = await getUser();

  return (
    <header>
      <div className="hidden bg-white lg:block border-b border-gray-200">
        <div className="px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-x-4">
                <Link href="/" className="flex gap-x-1.5 items-center mr-4">
                  <IconCar className="size-8 stroke-[1.5] shrink-0 text-indigo-600" />
                  <div className="text-gray-900/60 font-semibold">
                    AutoFleet
                  </div>
                </Link>
                <nav>
                  <ul className="flex gap-x-8 text-sm font-medium text-gray-700 *:transition-colors *:hover:text-gray-950">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} prefetch={item.prefetch}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              {user ? (
                <div className="flex gap-x-6 items-center">
                  <div className="flex gap-x-8 text-gray-400">
                    <button className="-m-2 flex items-center gap-x-2 p-2 text-gray-400">
                      <div className="shrink-0 border p-1 rounded-full border-gray-300 text-gray-700">
                        <IconUser />
                      </div>
                      <div className="hidden max-w-60 truncate text-sm text-gray-700 lg:block">
                        {user.email}
                      </div>
                    </button>
                  </div>
                  <div className="h-6 w-px mr-2 bg-gray-200" aria-hidden />
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  prefetch={false}
                  className="text-gray-700 transition-colors hover:text-gray-950 font-medium text-sm"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
