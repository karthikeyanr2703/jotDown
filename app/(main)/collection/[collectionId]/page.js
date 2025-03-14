import getCollectionWithId from "@/actions/getCollectionWithId";
import DeleteCollectionDialog from "@/components/DeleteCollectionDialog";
import JournalFilters from "@/components/JournalFilters";

const CollectionWithId = async ({ params }) => {
  const { collectionId } = params;
  let collection = await getCollectionWithId(collectionId);
  // console.log(collection, "Collection👌🔥");

  return (
    <div className="w-full min-h-screen px-3 mt-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-wide p-2 bg-clip-text bg-gradient-to-b from-violet-500 to-fuchsia-500 text-transparent">
          {collection?.name || "Collection"}
        </h1>
        <DeleteCollectionDialog collection={collection} />
      </div>
      <JournalFilters entries={collection?.entries} collection={collection} />
    </div>
  );
};

export default CollectionWithId;
