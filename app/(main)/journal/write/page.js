"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import diaryImg from "@/assets/diary.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { moods } from "@/lib/data";
import TipTapEditor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import CollectionForm from "@/components/CollectionForm";
import { useEffect, useState } from "react";
import getAllCollections from "@/actions/getAllCollections";
import createEntry from "@/actions/createEntry";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import entryWithId from "@/actions/entryWithId";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import updateEntry from "@/actions/updateEntry";

const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  moodScore: z.string().min(1, "Mood is required"),
  collectionId: z.string(),
});
const JournalEntryPage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      moodScore: "",
      collectionId: "",
      content:
        "<h4>✨Hello, Write <strong>your</strong> your entry here !✍🏽</h4>",
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [editId, setEditId] = useState("");
  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  let entryId = searchParams.get("editId");
  let router = useRouter();

  useEffect(() => {
    if (entryId) {
      setEditId(entryId);
    }
  }, []);
  useEffect(() => {
    let getEntryEdit = async (editId) => {
      let entry = await entryWithId(editId);
      setEntry(entry);
    };
    if (editId) {
      getEntryEdit(editId);
    }
  }, [editId]);

  const handleCloseDialog = () => setIsDialogOpen(false);
  const moodScore = watch("moodScore");

  let onSubmit = async (data) => {
    try {
      if (entry && editId) {
        await updateEntry(data, editId);
        reset();
        toast.success("Entry updated successfully", {
          style: { color: "black", background: "#a6ff96" },
        });
        router.push(`/journal/${editId}`);
      } else {
        await createEntry(data);
        reset();
        toast.success("Entry created successfully", {
          style: { color: "black", background: "#a6ff96" },
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error while ${editId ? "updating" : "creating"} entry`, {
        style: { color: "black", background: "#ff998e" },
      });
    }
  };
  const moodText =
    moods.find((mood) => mood.moodScore === parseInt(moodScore, 10))?.text ||
    "Jot down your journal entry here !";
  let fetchCollections = async () => {
    const collections = await getAllCollections();
    setCollections(collections);
  };
  useEffect(() => {
    fetchCollections();
    if (!editId) {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (entry && editId) {
      reset({
        title: entry?.title,
        moodScore: entry?.moodScore?.toString(10),
        collectionId: entry?.collection?.id,
        content: entry?.content,
      });
      setLoading(false);
    }
  }, [entry]);
  if (loading) {
    return (
      <div className="w-full h-[99vh] flex flex-row items-center justify-center gap-4 rounded-md px-4">
        <Skeleton className="h-full w-[50%]" />
        <Skeleton className="h-full w-[50%]" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh - 60px)] h-[99vh] px-4">
      <div className="w-full flex flex-row items-center justify-center gap-3 mb-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start justify-center gap-3 w-full md:w-[50%]"
        >
          <h1 className="mb-2 font-bold tracking-wider mt-5">
            Write Journal Entry
          </h1>
          <Label htmlFor="title">Title:</Label>
          <Input
            id="title"
            placeholder="Title"
            {...register("title")}
            className="w-full sm:w-[300px]"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <Label htmlFor="moodScore">Mood:</Label>
          <Controller
            id="moodScore"
            name="moodScore"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full sm:w-[300px] text-black">
                  <SelectValue placeholder="Select a mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Moods</SelectLabel>
                    {moods.map((moodData) => (
                      <SelectItem
                        key={moodData.id}
                        value={moodData.moodScore.toString(10)}
                      >
                        {moodData.mood}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.moodScore && (
            <p className="text-red-500">{errors.moodScore.message}</p>
          )}
          <Label htmlFor="collectionId">Collection:</Label>
          <Controller
            id="collectionId"
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full sm:w-[300px] text-black">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Collections</SelectLabel>
                    {collections.map((collectionData) => {
                      return (
                        <SelectItem
                          key={collectionData.id}
                          value={collectionData.id}
                        >
                          {collectionData.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-[300px] !flex flex-row items-center justify-start"
                variant="formCollection"
                type="button"
              >
                + Create new collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
                <DialogDescription>
                  Make your own collection to store your journal entries
                </DialogDescription>
              </DialogHeader>
              <CollectionForm
                getCollections={fetchCollections}
                handleCloseDialog={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
          {errors.collectionId && (
            <p className="text-red-500">{errors.collectionId.message}</p>
          )}
          <h3>{moodText}</h3>
          <Controller
            name="content"
            control={control}
            render={({ field }) => {
              return (
                <TipTapEditor
                  value={field.value}
                  onChange={field.onChange}
                  isEdit={editId !== "" ? true : false}
                  entry={entry}
                />
              );
            }}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}

          <div className="w-full flex flex-row gap-3 items-center justify-start mb-3">
            {editId && (
              <Link
                className="w-fit h-fit"
                href={`/collection/${
                  entry?.collectionId ? entry?.collection?.id : "unorganized"
                }`}
              >
                <Button variant="delete2">Cancel</Button>
              </Link>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : entry && editId ? (
                "Update Entry"
              ) : (
                "Create Entry"
              )}
            </Button>
          </div>
        </form>
        <div className="rounded-md overflow-hidden min-h-[520px] flex-1 relative sm:block hidden">
          <Image
            src={diaryImg}
            alt="diaryImg"
            fill={true}
            className="object-cover absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalEntryPage;
