import AddNewCollection from "./AddNewCollection";
import EntriesWithCollection from "./EntriesWithCollection";
import NoCollection from "./NoCollection";
import Link from "next/link";

const Collections = ({ collections }) => {
  return (
    <div className="w-full mt-5 mb-5">
      <h2 className="text-2xl font-bold text-left w-full">Collections</h2>
      <div
        className="w-full mt-5 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-center justify-items-center gap-4"
        id="collectionsContainer"
      >
        <AddNewCollection />
        {collections[0].name === "Unorganized" &&
        collections[0].entriesCount === 0 ? null : (
          <Link href={`/collection/unorganized`}>
            <NoCollection noCollection={collections[0]} />
          </Link>
        )}
        <EntriesWithCollection collections={collections.slice(1)} />
      </div>
    </div>
  );
};

export default Collections;
