"use client";
import deleteEntryWithId from "@/actions/deleteEntryWithId";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
const DeleteEntryDialog = ({ entry }) => {
  let [open, setOpen] = useState(false);
  let [deleting, setDeleting] = useState(false);
  const router = useRouter();
  // console.log(entry);

  let handleDeleteEntry = async () => {
    try {
      setDeleting(true);
      await deleteEntryWithId(entry?.id, entry?.collectionId);
      toast.error("Entry deleted successfully", {
        style: { color: "black", background: "#ff998e" },
      });
      router.push(
        `/collection/${
          entry?.collectionId ? entry?.collectionId : "unorganized"
        }`
      );
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        style: { color: "black", background: "#ff998e" },
      });
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="delete2">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="tracking-wider">
            This action cannot be undone. This will permanently delete the entry{" "}
            <span className="text-black font-bold ">{entry?.title}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleDeleteEntry}
              disabled={deleting}
            >
              {deleting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEntryDialog;
