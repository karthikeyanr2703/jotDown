import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
const EntriesWithCollection = ({ collections }) => {
  // console.log(typeof collections?.[0].createdAt, "💻");
  // console.log("createdAt 😀", typeof collections[0].createdAt);
  // console.log(collections);

  return (
    <>
      {collections.map((collection) => {
        return (
          <Link href={`/collection/${collection?.id}`}>
            <div
              className="relative w-60 h-48 bg-blue-200 rounded-lg flex flex-col items-center justify-start gap-3  before:absolute before:w-[90%] before:h-2 before:bg-blue-600 before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full before:rounded-tl-lg before:rounded-tr-lg p-2 cursor-pointer"
              key={collection.id}
            >
              <h3 className="text-start text-lg font-bold">
                📁 {collection.name}
              </h3>
              <div className="w-full flex flex-row items-center justify-between">
                <p className="text-xs font-normal text-gray-600">
                  {collection.entriesCount} entries
                </p>
                <p className="text-xs font-normal text-gray-600">
                  {formatDistanceToNow(new Date(collection.createdAt), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </p>
              </div>
              <div className="w-full flex flex-col items-start justify-start gap-2">
                {collection.entries.length === 0 ? (
                  <p className="text-[12px] text-black ">No entries yet</p>
                ) : (
                  collection.entries.map((entry, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full rounded-lg bg-white p-1 text-sm"
                      >
                        🎯 {entry.title}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default EntriesWithCollection;
