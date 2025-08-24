"use client";

import { useVehicleContext } from "@/lib/context/vehicle-context";
import { usePagination } from "@/lib/hooks/use-pagination";
import { useVehicleFilter } from "@/lib/hooks/use-vehicle-filter";
import CarIcon from "@/ui/car-icon";
import Pagination from "@/ui/components/pagination";
import Spinner from "@/ui/components/spinner";
import { IconSearch } from "@tabler/icons-react";

export default function Page() {
  const { vehicles } = useVehicleContext();
  const {
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    yearFilter,
    setYearFilter,
    brandFilter,
    setBrandFilter,
    uniqueYears,
    uniqueBrands,
  } = useVehicleFilter(vehicles);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems: paginatedVehicles,
    getPaginationRange,
  } = usePagination(filteredVehicles, 6);

  if (!vehicles) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl text-gray-900 font-semibold">All Vehicles</h1>
        <div className="lg:p-6 py-6 lg:mt-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <IconSearch className="size-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search vehicles by brand or model"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              aria-label="Filter by brand"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter by year"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          Showing {paginatedVehicles.length} of {filteredVehicles.length}{" "}
          vehicles
        </div>
        {paginatedVehicles.length === 0 ? (
          <div className="text-center py-12">
            <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              No vehicles found
            </p>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedVehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-lg shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <CarIcon className="h-8 w-8 text-indigo-600 mr-3 shrink-0" />
                    <div className="overflow-hidden">
                      <p
                        className="text-lg font-semibold text-gray-900 truncate"
                        title={`${vehicle.brand} ${vehicle.model}`}
                      >
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-gray-600">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-x-2">
                      <span className="text-sm text-gray-600">Color:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {vehicle.color}
                      </span>
                    </div>
                    <div className="flex justify-between gap-x-2">
                      <span className="text-sm text-gray-600">VIN:</span>
                      <span className="text-sm font-mono text-gray-900">
                        {vehicle.vin}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex  justify-between lg:justify-center gap-2">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              getPaginationRange={getPaginationRange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
