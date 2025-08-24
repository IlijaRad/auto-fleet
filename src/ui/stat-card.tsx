import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type StatCardProps = {
  name: string;
  stat: string | number;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

export default function StatCard({ name, Icon, stat }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <Icon aria-hidden="true" className="h-6 w-6 text-white" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {name}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline ">
        <p className="text-2xl font-semibold text-gray-900">{stat}</p>
      </dd>
    </div>
  );
}
