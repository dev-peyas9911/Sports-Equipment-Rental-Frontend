import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import GearCard from "./gears/_components/GearCard";
import { getGears } from "./gears/_lib/getGears";
import { getMe } from "@/services/getMe";

const HomePage = async () => {
  const [gears, user] = await Promise.all([getGears(), getMe()]);

  const authenticated = user.success;
  const canRent = authenticated && user.data?.result?.role === "CUSTOMER";

  const latestGears = [...gears]
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return bTime - aTime;
    })
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">GearGo Rentals</h1>
        <p className="text-muted-foreground">
          Rent quality sports equipment for your next adventure.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest Gears</h2>
          <Button asChild variant="link" className="gap-1 px-0">
            <Link href="/gears">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {latestGears.length === 0 ? (
          <p className="text-sm text-muted-foreground">No gear available yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestGears.map((gear) => (
              <GearCard
                key={gear.id}
                gear={gear}
                canRent={canRent}
                authenticated={authenticated}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
