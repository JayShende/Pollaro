import { Prisma } from "@repo/db/client";
import httpStatus from "http-status";
import ApiError from "./api-error";

export function handlePrismaError(error: unknown): never {
  // If error is already an ApiError, just rethrow it
  if (error instanceof ApiError) {
    throw error;
  }

  // Handle known Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        throw new ApiError(
          httpStatus.CONFLICT,
          "Duplicate value already exists"
        );

      case "P2003": // Foreign key constraint failed
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Invalid reference (foreign key constraint failed)"
        );

      case "P2025": // Record not found
        throw new ApiError(httpStatus.NOT_FOUND, "Requested record not found");

      default:
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Database error occurred"
        );
    }
  }

  // Fallback: rethrow unknown errors unchanged
  throw error;
}
