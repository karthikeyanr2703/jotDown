import { getCollectionsForDashboard } from "@/actions/dashboardActions";
import Analytics from "@/components/Analytics";
import { Suspense } from "react";
import Collections from "@/components/Collections";
import CollectionsDashboardSkeleton from "@/components/CollectionsDashboardSkeleton";
import RandomQuote from "@/components/RandomQuote";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

const Dashboard = async ({ searchParams }) => {
  const page = searchParams?.page ?? "1";
  const per_page = searchParams?.per_page ?? "10";
  let skip = (Number(page) - 1) * Number(per_page);
  const { result: collections, collectionsCount } =
    await getCollectionsForDashboard(skip, Number(per_page));
  // console.log(collectionsCount);

  // console.log(result?.result?.[0]?.createdAt, "collections");

  return (
    <div className="w-full min-h-screen px-3">
      <RandomQuote />
      <Analytics />
      <Suspense fallback={<CollectionsDashboardSkeleton />}>
        <Collections collections={collections} />
      </Suspense>
      <div className="w-full mb-5">
        <PaginationWithLinks
          page={Number(page)}
          pageSize={Number(per_page)}
          totalCount={collectionsCount}
         />
      </div>
    </div>
  );
};

export default Dashboard;
