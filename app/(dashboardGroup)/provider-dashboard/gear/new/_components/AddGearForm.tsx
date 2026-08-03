"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";

import GearForm from "./GearForm";
import { addGearAction, type AddGearState } from "../_actions/addGearAction";
import type { CategoryOption } from "../_lib/getCategories";

const AddGearForm = ({ categories }: { categories: CategoryOption[] }) => {
  const initialState: AddGearState = { success: false, message: "" };
  const [state, formAction, pending] = useActionState(addGearAction, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return <GearForm action={formAction} categories={categories} pending={pending} submitLabel="Add Gear" />;
};

export default AddGearForm;
