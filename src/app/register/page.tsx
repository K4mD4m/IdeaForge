import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
