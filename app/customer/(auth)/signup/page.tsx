import type { Metadata } from "next";
import SignupForm from "./form";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Register for the Imanigifts logistics portal and start booking shipments.",
};

export default function SignupPage() {
  return <SignupForm />;
}
