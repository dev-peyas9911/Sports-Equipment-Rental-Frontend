import { PackageOpen } from "lucide-react";

import GearCard from "./_components/GearCard";
import { getGears } from "./_lib/getGears";
import { getMe } from "@/services/getMe";

const GearsPage = async () => {
  const [gears, user] = await Promise.all([getGears(), getMe()]);

  const authenticated = user.success;
  const canRent = authenticated && user.data?.result?.role === "CUSTOMER";

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">All Gears</h1>
        <p className="text-sm text-muted-foreground">
          Browse our full collection of sports equipment available for rent.
        </p>
      </div>

      {gears.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-20 text-muted-foreground">
          <PackageOpen className="size-10" />
          <p>No gear available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gears.map((gear) => (
            <GearCard
              key={gear.id}
              gear={gear}
              canRent={canRent}
              authenticated={authenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GearsPage;
