import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default async function ForgotPassword() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <ForgotPasswordForm />
}
