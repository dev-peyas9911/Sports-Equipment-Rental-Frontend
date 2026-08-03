"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { AddGearState } from "../../gear/new/_actions/addGearAction";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteGearAction = async (
  gearId: string,
  _prevState: AddGearState,
): Promise<AddGearState> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "You are not authenticated." };
  }

  try {
    const res = await fetch(`${API_URL}/api/provider/gear/${gearId}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to delete gear.",
      };
    }
  } catch (error) {
    console.error("deleteGearAction error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  revalidatePath("/provider-dashboard/my-gears");

  return { success: true, message: "Gear deleted successfully." };
};
