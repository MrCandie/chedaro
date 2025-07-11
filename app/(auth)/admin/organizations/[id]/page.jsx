"use client";

import { useParams, useRouter } from "next/navigation";
import useGet from "@/hooks/useGet";
import { url } from "@/hooks/lib";

export default function ViewOrganizationPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isPending } = useGet(
    `${url}/v1/organizations/${id}`,
    "organizations" + id
  );

  const result = data?.data;

  const handleDelete = () => {};

  const handleUpdate = () => {};

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl capitalize font-bold">{result?.name}</h1>
          <p className="text-sm text-gray-500">
            Created on {new Date(result?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="space-x-3">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 cursor-pointer bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>

      {/* Employees Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Employees</h2>
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-100 border-b">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {result?.employees?.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-b-blue-100 hover:bg-gray-50">
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3 text-right">
                  <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {result?.employees.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
