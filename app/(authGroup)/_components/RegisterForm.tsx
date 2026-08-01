"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const initialState = {
    success: false,
    statusCode: 0,
    message: "",
  };
  const [state, action, pending] = useActionState(
    registerAction.bind(null, redirectTo),
    initialState,
  );

  // const router = useRouter()

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="name" type="text" placeholder="Enter Your Name" required />
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Enter Your Phone"
          required
        />
        <Input
          name="address"
          type="text"
          placeholder="Enter Your Address"
          required
        />
        <Button type="submit">{pending ? "Submitting..." : "Register"}</Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
