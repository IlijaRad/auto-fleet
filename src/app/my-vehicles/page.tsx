"use client";

import { useVehicleContext } from "@/lib/context/vehicle-context";
import {
  Service,
  ServiceWithoutId,
  Vehicle,
  VehicleValidate,
} from "@/lib/types";
import ServiceModal from "@/ui/modals/service";
import VehicleModal from "@/ui/modals/vehicle";
import { IconCar, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function Page() {
  const {
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addService,
    updateService,
    deleteService,
    getUserVehicles,
    getVehicleServices,
  } = useVehicleContext();
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setShowVehicleModal(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleModal(true);
  };

  const handleSaveVehicle = (vehicleData: VehicleValidate) => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, vehicleData);
    } else {
      addVehicle(vehicleData);
    }
  };

  const handleAddService = (vehicleId: number) => {
    setSelectedVehicle(vehicleId);
    setEditingService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setSelectedVehicle(service.vehicleId);
    setShowServiceModal(true);
  };

  const handleSaveService = (serviceData: ServiceWithoutId) => {
    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }
  };

  const userVehicles = getUserVehicles();

  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex item-center justify-between mb-8">
          <h1 className="text-2xl text-gray-900  font-semibold">My Vehicles</h1>
          <button
            onClick={handleAddVehicle}
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <IconPlus className="size-5 mr-2" />
            Add Vehicle
          </button>
        </div>

        {userVehicles.length === 0 ? (
          <div className="text-center py-12">
            <IconCar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              No vehicles yet
            </p>
            <p className="text-gray-600 mb-4">
              Get started by adding your first vehicle.
            </p>
            <button
              onClick={handleAddVehicle}
              className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userVehicles.map((vehicle: Vehicle) => {
              const services = getVehicleServices(vehicle.id);
              return (
                <div key={vehicle.id} className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="overflow-hidden">
                        <p
                          className="text-xl font-semibold text-gray-900 truncate"
                          title={`${vehicle.brand} ${vehicle.model}`}
                        >
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-gray-600">
                          {vehicle.year} • {vehicle.color} • VIN: {vehicle.vin}
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleEditVehicle(vehicle)}
                          className="text-indigo-600 cursor-pointer hover:text-indigo-800 p-2"
                          aria-label="Edit Vehicle"
                        >
                          <IconEdit className="size-5" />
                        </button>
                        <button
                          onClick={() => deleteVehicle(vehicle.id)}
                          className="text-red-600 cursor-pointer hover:text-red-800 p-2"
                          aria-label="Delete Vehicle"
                        >
                          <IconTrash className="size-5" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-4 border-gray-300">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-medium text-gray-900">
                          Service History
                        </p>
                        <button
                          onClick={() => handleAddService(vehicle.id)}
                          className="bg-indigo-600 cursor-pointer text-white px-3.5 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors flex items-center"
                        >
                          <IconPlus className="h-4 w-4 mr-1" />
                          Add Service
                        </button>
                      </div>

                      {services.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          No services recorded
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {services.map((service: Service) => (
                            <div
                              key={service.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {service.description}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {service.date} •{" "}
                                  {service.type === "regular"
                                    ? "Regular"
                                    : "Repair"}{" "}
                                  • ${service.cost}
                                </p>
                              </div>
                              <div className="flex">
                                <button
                                  onClick={() => handleEditService(service)}
                                  className="text-indigo-600 cursor-pointer hover:text-indigo-800 p-2"
                                  aria-label="Edit Service"
                                >
                                  <IconEdit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteService(service.id)}
                                  className="text-red-600 cursor-pointer hover:text-red-800 p-2"
                                  aria-label="Delete Service"
                                >
                                  <IconTrash className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showVehicleModal && (
        <VehicleModal
          vehicle={editingVehicle}
          onClose={() => setShowVehicleModal(false)}
          onSave={handleSaveVehicle}
        />
      )}

      {showServiceModal && selectedVehicle && (
        <ServiceModal
          service={editingService}
          vehicleId={selectedVehicle}
          onClose={() => setShowServiceModal(false)}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
}
