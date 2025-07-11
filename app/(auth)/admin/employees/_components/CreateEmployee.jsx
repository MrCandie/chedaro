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
import useGet from "@/hooks/useGet";

const allPermissions = [
  "view_users",
  "manage_users",
  "view_roles",
  "manage_roles",
  "view_audit_trail",
];

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last name is required" }).trim(),
  organization: z
    .string()
    .min(1, { message: "Organization is required" })
    .trim(),
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
  permissions: z.array(z.string()).optional(),
});

export default function CreateEmployee({ setShowModal }) {
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

  const { data, isPending } = useGet(
    `${url}/v1/organizations`,
    "organizations-list"
  );

  const orgs =
    data?.data?.organizations?.map((el) => {
      return { value: el.id, label: el.name };
    }) || [];

  const handleSuccess = async () => {
    toast.success("Employee created");
    reset();
    setShowModal(false);
  };

  const createHandler = usePost({
    url: `${url}/v1/employee`,
    queryKey: "employee",
    title: "Employee created",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    createHandler.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create New Employee</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            label="First Name"
            name="firstName"
            placeholder="First Name"
            register={register}
            info={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            register={register}
            info={errors.lastName?.message}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            info={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            info={errors.password?.message}
          />

          <Input
            label="Organization"
            name="organization"
            options={orgs || []}
            register={register}
            info={errors.organization?.message}
            inputType="select"
          />

          {/* Permissions */}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createHandler.isPending}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
