import { MoveLeft } from "lucide-react";
import Link from "next/link";

const CollectionLayout = ({ children }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-start">
        <Link
          href="/dashboard"
          className="flex flex-row items-center justify-center px-3 "
        >
          <MoveLeft className="mr-2" /> Back to Dashboard
        </Link>
      </div>
      {children}
    </div>
  );
};

export default CollectionLayout;
