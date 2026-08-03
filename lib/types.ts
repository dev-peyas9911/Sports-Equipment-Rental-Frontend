import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type IUser = {
  success: boolean;
  message: string;
  data: {
    result: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export type NavbarProps = {
  user: IUser;
};


export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

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
    categoryId?: string;
    category?: GearCategory | null;
    createdAt?: string;
};

export const CONDITION_LABELS: Record<string, string> = {
    NEW: "New",
    LIKE_NEW: "Like New",
    GOOD: "Good",
    FAIR: "Fair",
    POOR: "Poor",
};