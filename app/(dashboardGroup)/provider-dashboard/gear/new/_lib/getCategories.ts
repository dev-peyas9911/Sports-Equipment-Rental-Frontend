import { cookies } from "next/headers";

export type CategoryOption = {
  id: string;
  name: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (): Promise<CategoryOption[]> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/categories`, {
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

    return raw.map((item: { id?: string; name?: string }) => ({
      id: item.id ?? "",
      name: item.name ?? "Unnamed",
    }));
  } catch (error) {
    console.error("getCategories error:", error);

    return [];
  }
};
