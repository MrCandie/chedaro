"use client";

import Link from "next/link";
import useGet from "@/hooks/useGet";
import { url } from "@/hooks/lib";
import EmployeeTableSkeleton from "@/components/EmployeeTableSkeleton";
import { FaPlus } from "react-icons/fa";
import { Fragment, useState } from "react";
import CreateEmployee from "./_components/CreateEmployee";

export default function EmployeesPage() {
  const [visible, setVisible] = useState(false);

  const { data, isPending } = useGet(
    `${url}/v1/organizations/employees`,
    "organization-employee"
  );

  const result = Array.isArray(data?.data) ? data.data : [];

  const handleCreate = () => {
    setVisible(true);
  };

  return (
    <Fragment>
      {visible && <CreateEmployee setShowModal={setVisible} />}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employees</h1>
          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaPlus /> Create Employee
          </button>
        </div>

        {isPending && <EmployeeTableSkeleton />}

        {/* Table */}
        {!isPending && (
          <div className="bg-white rounded shadow overflow-x-auto">
            {result?.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No employees found.
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left border-b">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Created At</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 capitalize">
                        {emp.firstName} {emp?.lastName}
                      </td>
                      <td className="px-4 py-2">{emp?.email}</td>
                      <td className="px-4 py-2 capitalize">{emp.role}</td>
                      <td className="px-4 py-2 font-mono">{emp.id}</td>
                      <td className="px-4 py-2">
                        {new Date(emp.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <Link href={`/organization/employee/${emp.id}`}>
                          <button className="text-blue-600 hover:underline">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
}
