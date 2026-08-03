"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";

import GearForm, { type GearFormValues } from "../../../new/_components/GearForm";
import { updateGearAction } from "../../../_actions/updateGearAction";
import type { AddGearState } from "../../../new/_actions/addGearAction";
import type { CategoryOption } from "../../../new/_lib/getCategories";
import type { GearItem } from "@/lib/types";

const EditGearForm = ({
  gearId,
  gear,
  categories,
}: {
  gearId: string;
  gear: GearItem;
  categories: CategoryOption[];
}) => {
  const initialState: AddGearState = { success: false, message: "" };
  const [state, formAction, pending] = useActionState(
    updateGearAction.bind(null, gearId),
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const defaultValues: GearFormValues = {
    name: gear.name,
    brand: gear.brand,
    description: gear.description,
    pricePerDay: gear.pricePerDay,
    stock: gear.stock,
    categoryId: gear.categoryId ?? gear.category?.id,
    condition: gear.condition,
    images: gear.images,
    specifications: gear.specifications as Record<string, string> | null,
    isAvailable: gear.isAvailable,
  };

  return (
    <GearForm
      action={formAction}
      categories={categories}
      defaultValues={defaultValues}
      pending={pending}
      submitLabel="Update Gear"
    />
  );
};

export default EditGearForm;
