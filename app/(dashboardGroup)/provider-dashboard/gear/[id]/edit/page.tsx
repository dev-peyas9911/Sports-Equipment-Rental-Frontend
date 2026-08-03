import { notFound } from "next/navigation";

import EditGearForm from "./_components/EditGearForm";
import { getProviderGear } from "../../_lib/providerGear";
import { getCategories } from "../../new/_lib/getCategories";

const EditGearPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [gear, categories] = await Promise.all([getProviderGear(id), getCategories()]);

  if (!gear) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Gear</h1>
        <p className="text-sm text-muted-foreground">Update the details of your gear.</p>
      </div>

      <EditGearForm gearId={id} gear={gear} categories={categories} />
    </div>
  );
};

export default EditGearPage;
