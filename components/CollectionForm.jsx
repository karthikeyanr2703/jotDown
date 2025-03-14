"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import createCollection from "@/actions/createCollection";
import { LoaderCircle } from "lucide-react";

const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
});

const CollectionForm = ({ handleCloseDialog, getCollections = () => {} }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
    },
  });
  const submitCreateCollection = async (data) => {
    try {
      await createCollection(data);
      await getCollections();
      reset();

      toast.success("New Collection created successfully", {
        style: {
          color: "black",
          background: "#a6ff96",
        },
      });
    } catch (error) {
      console.log(error.message);

      toast.error("Error while creating new collection", {
        style: { color: "black", background: "#ff998e" },
      });
    } finally {
      handleCloseDialog();
    }
  };
  return (
    <form className="w-full flex flex-col items-start justify-center gap-3">
      <Label htmlFor="terms">Collection Name:</Label>
      <Input {...register("name")} type="text" placeholder="collection" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <div className="w-full flex flex-row items-center justify-end">
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(submitCreateCollection)}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CollectionForm;
