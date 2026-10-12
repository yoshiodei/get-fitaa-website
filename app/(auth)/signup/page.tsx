import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | getFitaa",
  description: "Create a getFitaa account to book trusted, certified cleaners.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join getFitaa and book your first clean in minutes."
      panelTitle="Clean homes. Brighter lives."
      panelText="Create an account to book trusted cleaners, track your bookings and rebook with one tap."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0E7C3A] hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}