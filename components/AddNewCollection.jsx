"use client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CollectionForm from "./CollectionForm";
import { useState } from "react";
const AddNewCollection = () => {
  const [open, setOpen] = useState(false);

  let handleCloseDialog = () => setOpen(false);
  return (
    <div className="relative w-60 h-48 bg-slate-200 rounded-lg flex flex-col items-center justify-center before:absolute before:w-[90%] before:h-2 before:bg-slate-600 before:top-0 before:left-1/2 before:-translate-x-1/2 before:-translate-y-full before:rounded-tl-lg before:rounded-tr-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-9 h-9 bg-slate-400 outline-none border-none rounded-full flex flex-row items-center justify-center">
              <Plus className="w-5 h-5 font-bold" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
              <DialogDescription>
                Create your own collection for storing your journal entries
              </DialogDescription>
            </DialogHeader>
            <CollectionForm handleCloseDialog={handleCloseDialog} />
          </DialogContent>
        </Dialog>

        <p>Create New Collection</p>
      </div>
    </div>
  );
};

export default AddNewCollection;
