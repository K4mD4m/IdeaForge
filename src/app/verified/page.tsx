import { Suspense } from "react";
import VerifiedContent from "./VerifiedContent";

export default function VerifiedPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifiedContent />
    </Suspense>
  );
}
