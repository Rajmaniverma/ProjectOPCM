import { Suspense } from "react";
import SupplierDashboard from "./SupplierDashboard";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupplierDashboard />
    </Suspense>
  );
}