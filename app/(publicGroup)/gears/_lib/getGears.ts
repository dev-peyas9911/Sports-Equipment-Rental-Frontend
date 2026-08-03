import { cookies } from "next/headers";

export type GearCategory = {
  id: string;
  name: string;
};

export type GearItem = {
  id: string;
  name: string;
  brand: string | null;
  description: string;
  pricePerDay: number | string;
  stock: number;
  availableStock: number;
  condition: string;
  images: string[];
  specifications: Record<string, unknown> | null;
  isAvailable: boolean;
  category?: GearCategory | null;
};

export const CONDITION_LABELS: Record<string, string> = {
  NEW: "New",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor",
};

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
