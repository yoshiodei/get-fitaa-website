import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | getFitaa",
  description: "Log in to your getFitaa account to book and manage your cleans.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to book and manage your cleans."
      panelTitle="A cleaner home is just a login away."
      panelText="Pick up where you left off and book your next clean in minutes."
      footer={
        <>
          New to getFitaa?{" "}
          <Link href="/signup" className="font-semibold text-[#0E7C3A] hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}