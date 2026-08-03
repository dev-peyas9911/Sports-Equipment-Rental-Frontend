"use client";

import { toast } from "sonner";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { RentalOrder } from "@/services/rental";

const CLOSED_STATUSES = ["CANCELLED", "COMPLETED", "RETURNED"];

const PayButton = ({ order }: { order: RentalOrder }) => {
  const status = (order.status ?? "").toUpperCase();

  if (CLOSED_STATUSES.includes(status)) {
    return <span className="text-xs font-medium text-muted-foreground">Closed</span>;
  }

  if (order.payment) {
    return <span className="text-xs font-medium text-emerald-600">Paid</span>;
  }

  return (
    <Button
      size="sm"
      onClick={() => toast.info("Payment integration coming soon.")}
    >
      <CreditCard /> Pay
    </Button>
  );
};

export default PayButton;
