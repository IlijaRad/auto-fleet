"use client";

import { useVehicleContext } from "@/lib/context/vehicle-context";
import { formatCurrency } from "@/lib/formatCurrency";
import StatCard from "@/ui/stat-card";
import { IconCar, IconReceipt, IconSettings } from "@tabler/icons-react";

export default function Page() {
  const { getUserVehicles, getVehicleServices } = useVehicleContext();
  const vehicles = getUserVehicles();

  const totalServices = vehicles.reduce(
    (sum, vehicle) => sum + getVehicleServices(vehicle.id).length,
    0
  );

  const totalCost = vehicles.reduce((sum, vehicle) => {
    const services = getVehicleServices(vehicle.id);
    return (
      sum +
      services.reduce((serviceSum, service) => serviceSum + service.cost, 0)
    );
  }, 0);

  const stats = [
    {
      name: "Total Vehicles",
      stat: vehicles.length,
      icon: IconCar,
    },
    {
      name: "Total Services",
      stat: totalServices,
      icon: IconSettings,
    },
    {
      name: "Total Cost",
      stat: formatCurrency(totalCost),
      icon: IconReceipt,
    },
  ];

  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl text-gray-900 font-semibold">Dashboard</h1>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <StatCard
              key={item.name}
              Icon={item.icon}
              name={item.name}
              stat={item.stat}
            />
          ))}
        </dl>

        <div className="divide-y mt-8 divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <h2 className="px-4 py-5 sm:px-6 text-base font-semibold leading-6 text-gray-900">
            Recent vehicles
          </h2>
          {vehicles.length === 0 ? (
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 text-center">
                No vehicles found. Add your first vehicle to get started.
              </p>
            </div>
          ) : (
            <>
              {vehicles.slice(0, 3).map((vehicle) => (
                <div key={vehicle.id} className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.year} • {vehicle.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {getVehicleServices(vehicle.id).length} services
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
