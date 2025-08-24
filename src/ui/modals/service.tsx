"use client";

import type { Service, ServiceWithoutId } from "@/lib/types";
import { validateService } from "@/lib/validation";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function ServiceModal({
  service,
  vehicleId,
  onClose,
  onSave,
}: {
  service: Service | null;
  vehicleId: number;
  onClose: () => void;
  onSave: (serviceData: ServiceWithoutId) => void;
}) {
  const [formData, setFormData] = useState({
    description: service?.description || "",
    cost: service?.cost || 0,
    type: service?.type || "regular",
    date: service?.date || new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<{
    description?: string;
    cost?: string;
    type?: string;
    date?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateService(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({
      ...formData,
      vehicleId,
      cost: formData.cost,
    });
    onClose();
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-overlayExit data-[state=open]:animate-overlayShow fixed inset-0 z-50 cursor-pointer bg-gray-900/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 data-[state=open]:animate-contentShow transform overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl ring-1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ring-black/5 ring-inset focus:outline-hidden p-6 w-full max-w-md z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {service ? "Edit Service" : "Add New Service"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-gray-500 hover:text-gray-700 cursor-pointer p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close"
              >
                <IconX className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full max-h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost ($)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.cost === 0 ? "" : formData.cost}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({
                    ...formData,
                    cost: value === "" ? 0 : parseFloat(value) || 0,
                  });
                }}
              />
              {errors.cost && (
                <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="regular">Regular Maintenance</option>
                <option value="repair">Repair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
            <div className="flex space-x-3 pt-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-gray-700 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {service ? "Update" : "Add"} Service
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
