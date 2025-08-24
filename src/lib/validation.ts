import { z, ZodError } from "zod";
import { ServiceValidate, VehicleValidate } from "./types";

export const validateService = (data: ServiceValidate) => {
  const serviceSchema = z.object({
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(500, "Description cannot exceed 500 characters"),
    cost: z
      .number()
      .positive("Cost must be greater than 0")
      .max(100000, "Cost cannot exceed $100,000")
      .refine((val) => Number.isFinite(val), "Valid cost is required"),
    type: z.string().min(1, "Service type is required"),
    date: z.string().date("Valid date is required"),
  });

  const errors: {
    description?: string;
    cost?: string;
    type?: string;
    date?: string;
  } = {};

  try {
    serviceSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof typeof errors] = issue.message;
        }
      });
    }
  }

  return errors;
};

export const validateVehicle = (data: VehicleValidate) => {
  const currentYear = new Date().getFullYear();
  const vehicleSchema = z.object({
    brand: z
      .string()
      .trim()
      .min(1, "Brand is required")
      .max(50, "Brand cannot exceed 50 characters"),
    model: z
      .string()
      .trim()
      .min(1, "Model is required")
      .max(50, "Model cannot exceed 50 characters"),
    year: z
      .number()
      .int("Year must be an integer")
      .min(1900, "Year must be 1900 or later")
      .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
    color: z
      .string()
      .trim()
      .min(1, "Color is required")
      .max(30, "Color cannot exceed 30 characters"),
    vin: z
      .string()
      .trim()
      .length(17, "VIN must be exactly 17 characters")
      .regex(
        /^[A-HJ-NPR-Z0-9]{17}$/,
        "VIN must contain only uppercase letters (A-Z, excluding I, O, Q) and numbers"
      ),
  });

  const errors: {
    brand?: string;
    model?: string;
    year?: string;
    color?: string;
    vin?: string;
  } = {};

  try {
    vehicleSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof typeof errors] = issue.message;
        }
      });
    }
  }

  return errors;
};
