"use client";

import { Input } from "@/components/Input";
import { usePost } from "@/hooks/usePost";
import { url } from "@/hooks/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { ImSpinner10 } from "react-icons/im";

const schema = z.object({
  name: z.string().min(1, { message: "Organization name is required" }).trim(),
});

export default function CreateOrganization({ setShowModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async (data) => {
    toast.success("Organization created");
    reset();
    setShowModal(false);
  };

  const createHandler = usePost({
    url: `${url}/v1/organizations`,
    queryKey: "organizations",
    title: "Organization created",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    createHandler.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Organization name"
            register={register}
            name="name"
            info={errors.name?.message ? errors.name.message : null}
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button
              disabled={createHandler.isPending}
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700">
              Create{" "}
              {createHandler.isPending && (
                <span className="animate-spin">
                  <ImSpinner10 />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
