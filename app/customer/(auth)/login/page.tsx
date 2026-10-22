import type { Metadata } from "next";
import LoginForm from "./form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to the Imanigifts client or admin portal.",
};

export default function LoginPage() {
  return <LoginForm />;
}
