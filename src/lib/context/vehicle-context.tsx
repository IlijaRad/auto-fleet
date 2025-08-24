"use client";

import Spinner from "@/ui/components/spinner";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser } from "../actions/get-user";
import { MOCK_SERVICES } from "../data/services";
import { MOCK_VEHICLES } from "../data/vehicles";
import type {
  Service,
  ServiceWithoutId,
  User,
  Vehicle,
  VehicleValidate,
} from "../types";

type VehicleContextType = {
  vehicles: Vehicle[];
  services: Service[];
  user: User;
  addVehicle: (vehicleData: VehicleValidate) => void;
  updateVehicle: (id: number, vehicleData: VehicleValidate) => void;
  deleteVehicle: (id: number) => void;
  addService: (serviceData: ServiceWithoutId) => void;
  updateService: (id: number, serviceData: ServiceWithoutId) => void;
  deleteService: (id: number) => void;
  getUserVehicles: () => Vehicle[];
  getVehicleServices: (vehicleId: number) => Service[];
};

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const addVehicle = (vehicleData: VehicleValidate) => {
    if (!user || !user.id) return;
    const newVehicle = {
      id: Date.now(),
      ...vehicleData,
      userId: Number(user.id),
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const updateVehicle = (id: number, vehicleData: VehicleValidate) => {
    setVehicles(
      vehicles.map((v) => (v.id === id ? { ...v, ...vehicleData } : v))
    );
  };

  const deleteVehicle = (id: number) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const addService = (serviceData: ServiceWithoutId) => {
    const newService = {
      id: Date.now(),
      ...serviceData,
    };
    setServices([...services, newService]);
  };

  const updateService = (id: number, serviceData: ServiceWithoutId) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, ...serviceData } : s))
    );
  };

  const deleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const getUserVehicles = () => {
    return user
      ? vehicles.filter((v) => String(v.userId) === String(user.id))
      : [];
  };

  const getVehicleServices = (vehicleId: number) => {
    return services.filter((s) => s.vehicleId === vehicleId);
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        services,
        user,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addService,
        updateService,
        deleteService,
        getUserVehicles,
        getVehicleServices,
      }}
    >
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context)
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  return context;
};
