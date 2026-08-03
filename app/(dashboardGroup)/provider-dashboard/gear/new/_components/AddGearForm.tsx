"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { addGearAction, type AddGearState } from "../_actions/addGearAction";
import { GEAR_CONDITIONS, GEAR_CONDITION_LABELS } from "../_lib/constants";
import type { CategoryOption } from "../_lib/getCategories";

const fieldClass =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 md:text-sm dark:bg-input/30";
const labelClass = "text-sm font-medium text-foreground";

type FieldRow = { id: string };

const AddGearForm = ({ categories }: { categories: CategoryOption[] }) => {
  const initialState: AddGearState = { success: false, message: "" };
  const [state, formAction, pending] = useActionState(addGearAction, initialState);

  const [images, setImages] = useState<FieldRow[]>([{ id: crypto.randomUUID() }]);
  const [specs, setSpecs] = useState<FieldRow[]>([{ id: crypto.randomUUID() }]);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const addImage = () => setImages((prev) => [...prev, { id: crypto.randomUUID() }]);
  const removeImage = (id: string) =>
    setImages((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));

  const addSpec = () => setSpecs((prev) => [...prev, { id: crypto.randomUUID() }]);
  const removeSpec = (id: string) =>
    setSpecs((prev) => (prev.length > 1 ? prev.filter((row) => row.id !== id) : prev));

  return (
    <form action={formAction} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="name" className={labelClass}>
                Name <span className="text-destructive">*</span>
              </label>
              <Input id="name" name="name" placeholder="e.g. Mountain Bike" required />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="brand" className={labelClass}>
                Brand
              </label>
              <Input id="brand" name="brand" placeholder="e.g. Trek" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className={labelClass}>
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe the gear, its features, and rental terms"
              className={fieldClass}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="categoryId" className={labelClass}>
              Category <span className="text-destructive">*</span>
            </label>
            <select id="categoryId" name="categoryId" className={fieldClass} defaultValue="" required>
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No categories available. Please add categories from the backend first.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing &amp; Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="pricePerDay" className={labelClass}>
                Price Per Day (USD) <span className="text-destructive">*</span>
              </label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 12.50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="stock" className={labelClass}>
                Stock (quantity) <span className="text-destructive">*</span>
              </label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 5"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="condition" className={labelClass}>
              Condition <span className="text-destructive">*</span>
            </label>
            <select id="condition" name="condition" className={fieldClass} defaultValue="" required>
              <option value="" disabled>
                Select condition
              </option>
              {GEAR_CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {GEAR_CONDITION_LABELS[condition]}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {images.map((row, index) => (
            <div key={row.id} className="flex items-center gap-2">
              <Input
                name="images"
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              {images.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(row.id)}
                  aria-label="Remove image"
                >
                  <Trash2 />
                </Button>
              )}
              {index === images.length - 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addImage}
                  aria-label="Add image"
                >
                  <Plus />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specs.map((row, index) => (
            <div key={row.id} className="flex items-center gap-2">
              <Input name="specKey" placeholder="Key (e.g. Weight)" className="flex-1" />
              <Input name="specValue" placeholder="Value (e.g. 12kg)" className="flex-1" />
              {specs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpec(row.id)}
                  aria-label="Remove specification"
                >
                  <Trash2 />
                </Button>
              )}
              {index === specs.length - 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addSpec}
                  aria-label="Add specification"
                >
                  <Plus />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="checkbox"
              name="isAvailable"
              defaultChecked
              className="size-4 rounded border-input accent-primary"
            />
            List this gear as available for rent
          </label>
        </CardContent>
      </Card>

      <Separator />

      <CardFooter className="justify-end gap-2 px-0">
        <Button type="submit" disabled={pending}>
          {pending ? "Adding Gear..." : "Add Gear"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default AddGearForm;
