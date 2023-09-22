'use client'

import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { useSession } from "next-auth/react";

export default function ForgotPassword() {
  const session = useSession()
  console.log({session})
  // if (session) redirect("/");

  return <ForgotPasswordForm />;
}
