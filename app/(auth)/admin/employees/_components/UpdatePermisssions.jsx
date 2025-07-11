"use client";

import { url } from "@/hooks/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import { ImSpinner10 } from "react-icons/im";
import { useParams } from "next/navigation";
import { usePatch } from "@/hooks/usePatch";

const allPermissions = [
  "view_users",
  "manage_users",
  "view_roles",
  "manage_roles",
  "view_audit_trail",
];

const schema = z.object({
  permissions: z.array(z.string()).optional(),
});

export default function UpdatePermissions({ setShowModal, permissions }) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      permissions: [],
    },
  });

  const handleSuccess = async () => {
    toast.success("Employee created");
    reset();
    setShowModal(false);
  };

  const editHandler = usePatch({
    url: `${url}/v1/employee/${id}/permissions`,
    queryKey: "employee" + id,
    title: "Employee permission updated",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    editHandler.mutate(data);
  };

  useEffect(() => {
    reset({ permissions });
  }, [permissions, reset]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Employee Permissions</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="font-medium text-sm mb-1">Permissions</p>
            <div className="flex flex-wrap gap-3">
              {allPermissions.map((perm) => (
                <label
                  key={perm}
                  className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={perm}
                    {...register("permissions")}
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
            {errors.permissions?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.permissions.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              disabled={editHandler.isPending}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Update{" "}
              {editHandler.isPending && (
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
