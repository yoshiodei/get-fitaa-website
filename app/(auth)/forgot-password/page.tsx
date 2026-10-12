import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | getFitaa",
  description: "Reset your getFitaa password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we will send you a link to reset it."
      panelTitle="No worries, we have got you."
      panelText="Reset your password in a minute and get back to booking your clean."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-[#0E7C3A] hover:underline">
            Back to log in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}