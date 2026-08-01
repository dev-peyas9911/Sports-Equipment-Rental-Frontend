import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems"
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSidebarItems"



const CUSTOMER_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/customer-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Gears",
        href : "/customer-dashboard/my-gears",
        icon : FileText
    },
]


export const sidebarMenuItems = {
    CUSTOMER : CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER : PROVIDER_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}