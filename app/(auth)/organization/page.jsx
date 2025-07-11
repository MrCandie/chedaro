"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock employee data
const mockEmployees = [
  {
    id: "e001",
    name: "Sylvia",
    role: "admin",
    createdAt: "2024-01-01T09:10:00Z",
  },
  {
    id: "e002",
    name: "Tobi",
    role: "staff",
    createdAt: "2024-02-10T14:00:00Z",
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetch
    setEmployees(mockEmployees);
  }, []);

  const handleCreate = () => {
    alert("Open create employee modal or navigate to creation form");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Create Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {employees.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No employees found.
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left border-b">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2 capitalize">{emp.role}</td>
                  <td className="px-4 py-2 font-mono">{emp.id}</td>
                  <td className="px-4 py-2">
                    {new Date(emp.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/dashboard/orgadmin/employees/${emp.id}`}>
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
    </div>
  );
}
