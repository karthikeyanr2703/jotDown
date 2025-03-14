import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function NotFound() {
  return (
    <div className="w-full h-screen bg-white">
      <div className="flex flex-col items-center justify-center gap-2 mt-40">
        <h2 className="text-transparent font-extrabold bg-clip-text text-[45px] bg-gradient-to-r from-violet-500 to-fuchsia-500">
          404
        </h2>
        <p className="text-2xl font-bold">Page Not Found</p>
        <p className="text-xs text-gray-400 tracking-wider">
          Oops! The page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link href={"/"}>
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
