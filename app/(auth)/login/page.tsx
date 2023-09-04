import { Metadata } from "next";
import { LoginFields } from "./components/fields";

export const metadata: Metadata = {
  title: "login",
  description: "login fields",
};

export default function LoginPage() {
  return <LoginFields />;
}
