import Link from "next/link";
import { Pencil, PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONDITION_LABELS, type GearItem } from "@/lib/types";
import { getProviderGears } from "../gear/_lib/providerGear";
import DeleteGearButton from "./_components/DeleteGearButton";

const MyGearsPage = async () => {
  const gears = await getProviderGears();

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">My Gears</h1>
          <p className="text-sm text-muted-foreground">
            Manage the gear you have listed for rent.
          </p>
        </div>
        <Button asChild>
          <Link href="/provider-dashboard/gear/new">Add Gear</Link>
        </Button>
      </div>

      {gears.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-20 text-muted-foreground">
          <PackageOpen className="size-10" />
          <p>You haven&apos;t listed any gear yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gears.map((gear: GearItem) => {
            const price = Number(gear.pricePerDay);
            const outOfStock = gear.availableStock <= 0 || !gear.isAvailable;

            return (
              <Card key={gear.id}>
                <CardContent className="flex flex-wrap items-center gap-4 py-4">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium">{gear.name}</p>
                      {gear.brand && (
                        <span className="text-xs text-muted-foreground">{gear.brand}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {gear.category?.name ?? "Uncategorized"} &middot;{" "}
                      {CONDITION_LABELS[gear.condition] ?? gear.condition}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ${Number.isNaN(price) ? "0.00" : price.toFixed(2)}
                      <span className="text-xs font-normal text-muted-foreground"> / day</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {outOfStock ? "Unavailable" : `${gear.availableStock} available`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/provider-dashboard/gear/${gear.id}/edit`}>
                        <Pencil /> Edit
                      </Link>
                    </Button>
                    <DeleteGearButton gearId={gear.id} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyGearsPage;
