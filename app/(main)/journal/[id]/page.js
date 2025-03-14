import parse from "html-react-parser";
import entryWithId from "@/actions/entryWithId";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import getMood from "@/lib/getMood";
import DeleteEntryDialog from "@/components/DeleteEntryDialog";
import Link from "next/link";

const JournalPage = async ({ params }) => {
  const { id } = params;
  let entry = await entryWithId(id);
  console.log(entry);

  return (
    <div className="w-full min-h-screen px-3">
      <div className="w-full mt-5 flex flex-row items-center justify-center">
        <Image
          src={entry?.imageUrl}
          alt="moodImg"
          className="object-cover rounded-sm object-center"
          width={400}
          height={500}
          priority
        />
      </div>
      <div className="w-full mt-5 flex flex-col gap-3">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-violet-500 to-fuchsia-500 p-1">
            {entry?.title}
          </h2>
          <div className="flex flex-row items-center justify-center gap-2">
            <Link href={`/journal/write?editId=${entry?.id}`}>
              <Button>Edit</Button>
            </Link>
            <DeleteEntryDialog entry={entry} />
          </div>
        </div>
        <p className="text-left text-sm text-gray-500">
          Created at {format(entry?.createdAt, "MMMM do, yyyy")}
        </p>
        <div className="flex flex-row items-center justify-start gap-3">
          <p className="p-2 rounded-md text-white text-xs bg-black">
            Collection :
            {entry?.collectionId !== null
              ? entry?.collection.name
              : "Unorganized"}
          </p>
          <p className="bg-white p-1 text-xs rounded-md text-black border-2 border-black">
            Feeling {getMood(entry?.moodScore)}
          </p>
        </div>
        <div className="w-full text-left">{parse(entry?.content)}</div>
        <p className="text-left text-sm text-gray-500">
          Last Updated at {format(entry?.updatedAt, "MMMM do, yyyy, h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default JournalPage;
