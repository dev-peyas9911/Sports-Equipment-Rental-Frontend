"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }

    if (decodedToken.role === "CUSTOMER") {
      redirect("/customer-dashboard");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard");
    } else if (decodedToken.role === "PROVIDER") {
      redirect("/provider-dashboard");
    }
  }

  return result;
};

type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    result: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      phone: string;
      address: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export const registerAction = async (
  redirectTo: string,
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const payload = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
  };

  let result: RegisterState;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Registration failed.",
      };
    }

    // Redirect to login page after successful registration
  } catch (error) {
    console.error(error);

    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect(
    redirectTo
      ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
      : "/login",
  );
};
