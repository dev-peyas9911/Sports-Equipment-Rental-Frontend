"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteGearAction } from "../../gear/_actions/deleteGearAction";
import type { AddGearState } from "../../gear/new/_actions/addGearAction";

const DeleteGearButton = ({ gearId }: { gearId: string }) => {
  const initialState: AddGearState = { success: false, message: "" };
  const [state, formAction, pending] = useActionState(
    deleteGearAction.bind(null, gearId),
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

  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        <Trash2 /> {pending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};

export default DeleteGearButton;
