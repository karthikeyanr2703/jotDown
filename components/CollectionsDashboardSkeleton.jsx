import React from "react";

const CollectionsDashboardSkeleton = () => {
  return (
    <div className="w-full mt-5 mb-5">
      <h2 className="h-[40px] w-[400px] mb-5 bg-gray-300 animate-pulse rounded-md"></h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {new Array(8).fill(0).map((_, index) => {
          return (
            <div
              key={index}
              className="w-60 h-48 bg-gray-300 animate-pulse rounded-lg"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsDashboardSkeleton;
