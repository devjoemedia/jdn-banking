import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "@/components/LoginForm";
import { authOptions } from "app/lib/authOptions";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <LoginForm />;
}
