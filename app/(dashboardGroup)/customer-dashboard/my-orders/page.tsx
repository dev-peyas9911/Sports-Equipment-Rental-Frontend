import Image from "next/image";
import { Bike, PackageOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getMyRentals, type RentalOrder } from "@/services/rental";
import PayButton from "./_components/PayButton";

const STATUS_LABELS: Record<string, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  ACTIVE: "Active",
  RETURNED: "Returned",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const formatMoney = (value?: number | string) => {
  const number = Number(value);

  return Number.isNaN(number) ? "0.00" : number.toFixed(2);
};

const MyOrdersPage = async () => {
  const orders = await getMyRentals();

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your rental orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-20 text-muted-foreground">
          <PackageOpen className="size-10" />
          <p>You don&apos;t have any rental orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: RentalOrder) => {
            const gear = order.gear;
            const cover = gear?.images?.[0];
            const status = (order.status ?? "").toUpperCase();
            const statusLabel = STATUS_LABELS[status] ?? order.status ?? "Unknown";

            return (
              <Card key={order.id}>
                <CardContent className="flex flex-wrap items-center gap-4 py-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={gear?.name ?? "Gear"}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Bike className="size-6" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="truncate font-medium">{gear?.name ?? "Gear"}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.startDate)} &ndash; {formatDate(order.endDate)}
                      {typeof order.totalDays === "number" && ` · ${order.totalDays} day(s)`}
                      {typeof order.quantity === "number" && ` · Qty ${order.quantity}`}
                    </p>
                    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {statusLabel}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">${formatMoney(order.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">total</p>
                  </div>

                  <PayButton order={order} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
