import getUnorganizedCollection from "@/actions/getUnorganizedCollection";
import DeleteCollectionDialog from "@/components/DeleteCollectionDialog";
import JournalFilters from "@/components/JournalFilters";

const UnorganizedCollection = async () => {
  let collection = await getUnorganizedCollection();
  // console.log(collection);

  return (
    <div className="w-full min-h-screen px-3 mt-4 pb-3">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide p-2 bg-clip-text bg-gradient-to-b from-violet-500 to-fuchsia-500 text-transparent">
          Unorganized
        </h1>
        <DeleteCollectionDialog collection={collection} />
      </div>
      <JournalFilters entries={collection?.entries} collection={collection} />
    </div>
  );
};

export default UnorganizedCollection;
