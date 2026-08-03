import { cookies } from "next/headers";

import { type GearItem } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const normalizeList = (result: unknown): GearItem[] => {
  const raw =
    (result as Record<string, unknown>)?.data &&
    ((result as Record<string, unknown>).data as Record<string, unknown>)?.result
      ? ((result as Record<string, unknown>).data as Record<string, unknown>).result
      : (result as Record<string, unknown>)?.data
        ? (result as Record<string, unknown>).data
        : (result as Record<string, unknown>)?.result
          ? (result as Record<string, unknown>).result
          : result;

  return Array.isArray(raw) ? (raw as GearItem[]) : [];
};

export const getProviderGears = async (): Promise<GearItem[]> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) return [];

    const res = await fetch(`${API_URL}/api/provider/gear`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    if (!res.ok) return [];

    const result = await res.json();

    return normalizeList(result);
  } catch (error) {
    console.error("getProviderGears error:", error);

    return [];
  }
};

export const getProviderGear = async (gearId: string): Promise<GearItem | null> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) return null;

    const res = await fetch(`${API_URL}/api/provider/gear/${gearId}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();

    const raw =
      (result as Record<string, unknown>)?.data &&
      ((result as Record<string, unknown>).data as Record<string, unknown>)?.result
        ? ((result as Record<string, unknown>).data as Record<string, unknown>).result
        : (result as Record<string, unknown>)?.data
          ? (result as Record<string, unknown>).data
          : result;

    return (raw as GearItem) ?? null;
  } catch (error) {
    console.error("getProviderGear error:", error);

    return null;
  }
};
