export const metadata = {
  title: "Invoices - Mosaic",
  description: "Page description",
};

import { SelectedItemsProvider } from "@/app/selected-items-context";

import DistributorStaff from "./fleet-table";

function FleetContent() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Table */}
      <DistributorStaff />
    </div>
  );
}

export default function Distributor() {
  return (
    <SelectedItemsProvider>
      <FleetContent />
    </SelectedItemsProvider>
  );
}
