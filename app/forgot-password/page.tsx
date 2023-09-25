'use client'

import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { useSession } from "next-auth/react";

export default function ForgotPassword() {
  const session = useSession()
  // if (session) redirect("/");

  return <ForgotPasswordForm />;
}
