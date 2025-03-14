"use client";
import { useRouter } from "next/navigation";
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
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import deleteCollection from "@/actions/deleteCollection";
import { toast } from "sonner";

const DeleteCollectionDialog = ({ collection }) => {
  let [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  let router = useRouter();

  let handleDeleteCollection = async () => {
    try {
      setDeleting(true);
      if (collection.id !== null) {
        await deleteCollection(collection?.id);
        toast.error("Collection deleted successfully", {
          style: { color: "black", background: "#ff998e" },
        });
      } else {
        await deleteAllNoCollectionEntries();
        toast.error("Collection deleted successfully", {
          style: { color: "black", background: "#ff998e" },
        });
      }
      router.push("/dashboard");
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
        <Button variant="delete">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection?.name}&quot;
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full">
              <p>
                Are you sure you want to delete the &quot;{collection?.name}
                &quot; having {collection?.entries?.length || 0} entries?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteCollection}
              disabled={deleting}
            >
              {deleting ? <LoaderCircle className="animate-spin" /> : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionDialog;
