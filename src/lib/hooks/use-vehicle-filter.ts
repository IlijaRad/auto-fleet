"use client";

import type { Vehicle } from "@/lib/types";
import { useMemo, useState } from "react";

export const useVehicleFilter = (vehicles: Vehicle[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<number | "">("");
  const [brandFilter, setBrandFilter] = useState<string>("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = !yearFilter || vehicle.year === Number(yearFilter);
      const matchesBrand = !brandFilter || vehicle.brand === brandFilter;
      return matchesSearch && matchesYear && matchesBrand;
    });
  }, [vehicles, searchTerm, yearFilter, brandFilter]);

  const uniqueYears = useMemo(
    () => [...new Set(vehicles.map((v) => v.year))].sort((a, b) => b - a),
    [vehicles]
  );

  const uniqueBrands = useMemo(
    () => [...new Set(vehicles.map((v) => v.brand))].sort(),
    [vehicles]
  );

  return {
    filteredVehicles,
    searchTerm,
    setSearchTerm,
    yearFilter,
    setYearFilter,
    brandFilter,
    setBrandFilter,
    uniqueYears,
    uniqueBrands,
  };
};
