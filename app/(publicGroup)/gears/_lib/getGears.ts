import { cookies } from "next/headers";

import { type GearItem } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getGears = async (): Promise<GearItem[]> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/gear`, {
      headers: accessToken ? { Cookie: `accessToken=${accessToken}` } : undefined,
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();

    const raw =
      result?.data?.result ??
      result?.data ??
      result?.result ??
      result ?? [];

    if (!Array.isArray(raw)) {
      return [];
    }

    return raw as GearItem[];
  } catch (error) {
    console.error("getGears error:", error);

    return [];
  }
};
