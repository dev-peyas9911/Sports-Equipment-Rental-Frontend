"use client";

import { useEffect, useActionState, useState } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createRentalAction,
  type CreateRentalState,
} from "@/services/rental";

const labelClass = "text-sm font-medium text-foreground";

type RentButtonProps = {
  gearItemId: string;
  gearName: string;
  pricePerDay: number;
  canRent: boolean;
  authenticated: boolean;
  redirectTo?: string;
  availableStock?: number;
};

const RentButton = ({
  gearItemId,
  gearName,
  pricePerDay,
  canRent,
  authenticated,
  redirectTo = "/",
  availableStock,
}: RentButtonProps) => {
  const [open, setOpen] = useState(false);
  const initialState: CreateRentalState = { success: false, message: "" };
  const [state, formAction, pending] = useActionState(createRentalAction, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (!authenticated) {
    return (
      <Button asChild size="sm">
        <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}>Rent</Link>
      </Button>
    );
  }

  if (!canRent) {
    return (
      <Button size="sm" disabled title="Only customers can rent gear">
        Rent
      </Button>
    );
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <ShoppingCart /> Rent
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-card p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Rent {gearName}</h2>
                <p className="text-sm text-muted-foreground">
                  ${Number.isNaN(pricePerDay) ? "0.00" : pricePerDay.toFixed(2)} / day
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X />
              </Button>
            </div>

            <form action={formAction} className="mt-4 space-y-4">
              <input type="hidden" name="gearItemId" value={gearItemId} />

              <div className="space-y-1.5">
                <label htmlFor="quantity" className={labelClass}>
                  Quantity
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  max={availableStock ?? undefined}
                  defaultValue={1}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="startDate" className={labelClass}>
                    Start Date
                  </label>
                  <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="endDate" className={labelClass}>
                    End Date
                  </label>
                  <Input id="endDate" name="endDate" type="date" required />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={pending}>
                  {pending ? "Placing..." : "Confirm Rent"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RentButton;
