"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateRentalState = {
  success: boolean;
  message: string;
};

export const createRentalAction = async (
  _prevState: CreateRentalState,
  formData: FormData,
): Promise<CreateRentalState> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Please log in to rent gear." };
  }

  const gearItemId = String(formData.get("gearItemId") ?? "").trim();
  const quantityRaw = formData.get("quantity");
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();
  const quantity = Number(quantityRaw);

  if (!gearItemId) {
    return { success: false, message: "Invalid gear selected." };
  }
  if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
    return { success: false, message: "Quantity must be a positive integer." };
  }
  if (!startDate || !endDate) {
    return { success: false, message: "Please select start and end dates." };
  }
  if (new Date(endDate) < new Date(startDate)) {
    return { success: false, message: "End date must be after start date." };
  }

  try {
    const res = await fetch(`${API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ gearItemId, quantity, startDate, endDate }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create rental order.",
      };
    }
  } catch (error) {
    console.error("createRentalAction error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/customer-dashboard/my-orders");
};

export type RentalGear = {
  id?: string;
  name?: string;
  brand?: string | null;
  images?: string[];
  pricePerDay?: number | string;
};

export type RentalOrder = {
  id: string;
  customerId?: string;
  gearItemId?: string;
  gear?: RentalGear;
  quantity?: number;
  startDate?: string;
  endDate?: string;
  totalDays?: number;
  pricePerDay?: number | string;
  totalAmount?: number | string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  payment?: unknown | null;
};

export const getMyRentals = async (): Promise<RentalOrder[]> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) return [];

    const res = await fetch(`${API_URL}/api/rentals`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const result = await res.json();

    const raw =
      (result as Record<string, unknown>)?.data &&
      ((result as Record<string, unknown>).data as Record<string, unknown>)?.result
        ? ((result as Record<string, unknown>).data as Record<string, unknown>).result
        : (result as Record<string, unknown>)?.data
          ? (result as Record<string, unknown>).data
          : (result as Record<string, unknown>)?.result
            ? (result as Record<string, unknown>).result
            : result;

    return Array.isArray(raw) ? (raw as RentalOrder[]) : [];
  } catch (error) {
    console.error("getMyRentals error:", error);

    return [];
  }
};
