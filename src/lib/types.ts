export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  userId: number;
};

export type Service = {
  id: number;
  vehicleId: number;
  date: string;
  description: string;
  cost: number;
  type: string;
};

export type User = {
  email: string;
  id: string;
} | null;

export type ServiceWithoutId = Omit<Service, "id">;
export type ServiceValidate = Omit<ServiceWithoutId, "vehicleId" | "date">;

export type VehicleWithoutId = Omit<Vehicle, "id">;
export type VehicleValidate = Omit<VehicleWithoutId, "userId">;
