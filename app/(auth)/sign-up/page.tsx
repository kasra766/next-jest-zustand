import { Metadata } from "next";
import { SignUpFields } from "./components/fields";

export const metadata: Metadata = {
  title: "sign up",
  description: "sign up fields",
};
export default function SignUpPage() {
  return <SignUpFields />;
}
