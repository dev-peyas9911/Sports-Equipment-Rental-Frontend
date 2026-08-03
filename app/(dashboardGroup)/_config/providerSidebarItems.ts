import { ISidebarItem } from "@/lib/types";
import { CirclePlus, FileText, LayoutDashboard } from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Provider Dashboard",
        href: "/provider-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Add Gear",
        href: "/provider-dashboard/gear/new",
        icon: CirclePlus
    },
    {
        label: "My Gears",
        href: "/provider-dashboard/my-gears",
        icon: FileText
    },
]