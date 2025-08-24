import { IconCar } from "@tabler/icons-react";
import LoginForm from "../../ui/forms/login-form";

export default async function Page() {
  return (
    <div className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-89 rounded-xl border-gray-200 bg-white lg:border lg:p-8">
        <div className="flex justify-center gap-x-1.5 items-center mr-4">
          <IconCar className="size-8 stroke-[1.5] shrink-0 text-indigo-600" />
          <div className="text-gray-900/60 font-semibold">AutoFleet</div>
        </div>
        <h1 className="mx-auto mt-4 w-fit text-lg/7 font-semibold text-gray-900">
          Log In
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
