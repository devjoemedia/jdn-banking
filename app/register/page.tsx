import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/authOptions";
import RegisterForm from "@/components/RegisterForm";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <RegisterForm />;
}