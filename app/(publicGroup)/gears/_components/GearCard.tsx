import Image from "next/image";
import { Bike, PackageOpen } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONDITION_LABELS, type GearItem } from "@/lib/types";
import RentButton from "./RentButton";

type GearCardProps = {
  gear: GearItem;
  canRent?: boolean;
  authenticated?: boolean;
  redirectTo?: string;
};

const GearCard = ({ gear, canRent = false, authenticated = false, redirectTo = "/" }: GearCardProps) => {
  const cover = gear.images?.[0];
  const price = Number(gear.pricePerDay);
  const conditionLabel = CONDITION_LABELS[gear.condition] ?? gear.condition;
  const outOfStock = gear.availableStock <= 0 || !gear.isAvailable;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={gear.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Bike className="size-10" />
          </div>
        )}
        {!outOfStock && (
          <span className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur">
            {conditionLabel}
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            Unavailable
          </span>
        )}
      </div>

      <CardContent className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium leading-snug">{gear.name}</h3>
          {gear.brand && (
            <span className="shrink-0 text-xs text-muted-foreground">{gear.brand}</span>
          )}
        </div>

        {gear.category?.name && (
          <p className="text-xs text-muted-foreground">{gear.category.name}</p>
        )}

        <p className="line-clamp-2 text-sm text-muted-foreground">{gear.description}</p>
      </CardContent>

      <CardFooter className="items-center justify-between">
        <div>
          <span className="text-base font-semibold">
            ${Number.isNaN(price) ? "0.00" : price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground"> / day</span>
        </div>
        {outOfStock ? (
          <Button size="sm" disabled>
            <PackageOpen /> Unavailable
          </Button>
        ) : (
          <RentButton
            gearItemId={gear.id}
            gearName={gear.name}
            pricePerDay={price}
            availableStock={gear.availableStock}
            canRent={canRent}
            authenticated={authenticated}
            redirectTo={redirectTo}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default GearCard;
