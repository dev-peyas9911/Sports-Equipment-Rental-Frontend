"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AddGearState } from "../../gear/new/_actions/addGearAction";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateGearAction = async (
  gearId: string,
  _prevState: AddGearState,
  formData: FormData,
): Promise<AddGearState> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim();
  const pricePerDayRaw = formData.get("pricePerDay");
  const stockRaw = formData.get("stock");
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const condition = String(formData.get("condition") ?? "").trim();
  const isAvailable = formData.get("isAvailable") === "on";

  const images = (formData.getAll("images") as string[])
    .map((img) => img.trim())
    .filter((img) => img.length > 0);

  const specKeys = formData.getAll("specKey") as string[];
  const specValues = formData.getAll("specValue") as string[];
  const specifications: Record<string, string> = {};

  specKeys.forEach((key, index) => {
    const trimmedKey = key.trim();
    const value = (specValues[index] ?? "").trim();

    if (trimmedKey.length > 0) {
      specifications[trimmedKey] = value;
    }
  });

  const pricePerDay = Number(pricePerDayRaw);
  const stock = Number(stockRaw);

  if (!name) {
    return { success: false, message: "Gear name is required." };
  }
  if (!description) {
    return { success: false, message: "Description is required." };
  }
  if (!categoryId) {
    return { success: false, message: "Please select a category." };
  }
  if (!condition) {
    return { success: false, message: "Please select a condition." };
  }
  if (Number.isNaN(pricePerDay) || pricePerDay <= 0) {
    return { success: false, message: "Price per day must be greater than 0." };
  }
  if (Number.isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    return { success: false, message: "Stock must be a valid non-negative integer." };
  }

  const payload = {
    name,
    brand,
    description,
    pricePerDay,
    stock,
    categoryId,
    condition,
    images,
    specifications: Object.keys(specifications).length > 0 ? specifications : null,
    isAvailable,
  };

  try {
    const res = await fetch(`${API_URL}/api/provider/gear/${gearId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update gear.",
      };
    }
  } catch (error) {
    console.error("updateGearAction error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/provider-dashboard/my-gears");
};
