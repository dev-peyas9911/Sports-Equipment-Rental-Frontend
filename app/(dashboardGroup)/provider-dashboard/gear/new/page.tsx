import AddGearForm from "./_components/AddGearForm";
import { getCategories } from "./_lib/getCategories";

const AddGearPage = async () => {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Add New Gear</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to list a new item for rent.
        </p>
      </div>

      <AddGearForm categories={categories} />
    </div>
  );
};

export default AddGearPage;
