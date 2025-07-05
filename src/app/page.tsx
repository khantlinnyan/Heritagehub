import Layout from "@/components/layout";
import TripList from "@/components/molecules/trip-list";
import Header from "@/components/ui/header";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  // const { userId } = await auth();

  // if (!userId) {
  //   redirect("/auth");
  // }

  // const user = await currentUser();
  return (
    <Layout className="flex flex-col gap-4">
      <Header
        title="HeritageHub"
        subtitle="Discover the rich history and culture of your heritage."
      />
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link href="/preferences/create" className="flex flex-col items-center">
          <PlusCircleIcon size={80} color="#666666" />
          <h1 className="text-2xl text-zinc-700 font-semibold">
            Create a new plan
          </h1>
          <p className="text-muted-foreground -mt-1 text-center leading-normal">
            Start planning your next adventure
          </p>
        </Link>
      </div>
    </Layout>
  );
}
