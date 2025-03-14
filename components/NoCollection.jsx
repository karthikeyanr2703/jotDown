import { formatDistanceToNow } from "date-fns";
const NoCollection = ({ noCollection }) => {
  return (
    <div className="relative w-60 h-48 bg-blue-200 rounded-lg flex flex-col items-center justify-start gap-2 before:absolute before:w-[90%] before:h-2 before:bg-blue-600 before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full before:rounded-tl-lg before:rounded-tr-lg p-2 cursor-pointer">
      <h3 className="text-start text-lg font-bold">📁 {noCollection.name}</h3>
      <div className="w-full flex flex-row items-center justify-between ">
        <p className="text-[10px] font-normal text-gray-600">
          {noCollection.entriesCount} entries
        </p>
        <p className="text-[10px] font-normal text-gray-600">
          {formatDistanceToNow(noCollection.createdAt, {
            includeSeconds: true,
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="w-full flex flex-col items-start justify-start gap-2">
        {noCollection.entries.slice(0, 2).map((entry, index) => {
          return (
            <div key={index} className="w-full rounded-lg bg-white p-1 text-sm">
              🎯 {entry.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoCollection;
