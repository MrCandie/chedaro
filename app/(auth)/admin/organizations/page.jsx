"use client";
import { useEffect, useState } from "react";
import CreateOrganization from "./_components/CreateOrganization";
import OrganizationTableSkeleton from "@/components/OrganizationTableSkeleton";
import { useRouter } from "next/navigation";
import useGet from "@/hooks/useGet";
import { url } from "@/hooks/lib";

export default function OrganizationsPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data, isPending } = useGet(
    `${url}/v1/organizations`,
    "organizations"
  );

  const result = data?.data;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <button
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}>
          + Create Organization
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-sm text-gray-500">Total Organizations</h2>
          <p className="text-3xl font-semibold">{result?.totalOrganizations}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-sm text-gray-500">Total Employees</h2>
          <p className="text-3xl font-semibold">{result?.totalEmployees}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-sm text-gray-500">Total Admins</h2>
          <p className="text-3xl font-semibold">
            {result?.totalAdministrators}
          </p>
        </div>
      </div>

      {isPending && <OrganizationTableSkeleton />}

      {!isPending && (
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full">
            <thead className="bg-blue-100 border-b">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Organization</th>
                <th className="text-left px-4 py-3">Created</th>
                <th className="text-left px-4 py-3">Employees</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {result?.organizations?.map((org) => (
                <tr
                  key={org.id}
                  className="border-b border-b-blue-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{org.id}</td>
                  <td className="px-4 py-3">{org.name}</td>
                  <td className="px-4 py-3">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{org.employees.length}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="bg-blue-600 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-700 text-sm"
                      onClick={() =>
                        router.push(`/admin/organizations/${org._id}`)
                      }>
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {result?.organizations.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showModal && <CreateOrganization setShowModal={setShowModal} />}
    </div>
  );
}
