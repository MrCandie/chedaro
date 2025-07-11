"use client";

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import CreateEmployee from "./_components/CreateEmployee";
import useGet from "@/hooks/useGet";
import { url } from "@/hooks/lib";
import EmployeeTableSkeleton from "@/components/EmployeeTableSkeleton";

export default function EmployeesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isPending } = useGet(`${url}/v1/employee`, "employee");

  const result = Array.isArray(data?.data) ? data.data : [];

  const router = useRouter();

  return (
    <Fragment>
      {showCreateModal && <CreateEmployee setShowModal={setShowCreateModal} />}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Employees</h1>
          <button
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}>
            + Add Employee
          </button>
        </div>

        {isPending && <EmployeeTableSkeleton />}

        {!isPending && result && (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full">
              <thead className="bg-blue-100 border-b">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Created</th>
                  <th className="text-left px-4 py-3">Organization</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {result?.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-b-blue-100 hover:bg-gray-50">
                    <td className="px-4 py-3 capitalize">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="px-4 py-3">{emp?.email}</td>
                    <td className="px-4 py-3">{emp.id}</td>
                    <td className="px-4 py-3">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{emp.organization?.name}</td>
                    <td className="px-4 py-3 capitalize">{emp.role}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        className="bg-blue-600 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-700 text-sm"
                        onClick={() =>
                          router.push(`/admin/employees/${emp.id}`)
                        }>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {result?.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Fragment>
  );
}
