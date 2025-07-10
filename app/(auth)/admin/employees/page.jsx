"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock organization and user data
const mockOrganizations = [
  {
    id: "org001",
    name: "WakaFoody",
    employees: [
      {
        id: "e001",
        name: "Sylvia",
        createdAt: "2024-03-15T09:00:00Z",
        role: "orgadmin",
      },
      {
        id: "e002",
        name: "Tobi",
        createdAt: "2024-05-01T10:00:00Z",
        role: "employee",
      },
    ],
  },
  {
    id: "org002",
    name: "SwiftFoods",
    employees: [
      {
        id: "e003",
        name: "Lola",
        createdAt: "2024-06-01T12:30:00Z",
        role: "employee",
      },
    ],
  },
];

export default function EmployeesPage() {
  const [allEmployees, setAllEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Flatten all employees from orgs with orgName attached
    const result = mockOrganizations.flatMap((org) =>
      org.employees.map((emp) => ({
        ...emp,
        orgName: org.name,
      }))
    );
    setAllEmployees(result);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Employees</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-blue-100 border-b">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Created</th>
              <th className="text-left px-4 py-3">Organization</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-b-blue-100 hover:bg-gray-50">
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.id}</td>
                <td className="px-4 py-3">
                  {new Date(emp.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{emp.orgName}</td>
                <td className="px-4 py-3 capitalize">{emp.role}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="bg-blue-600 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-700 text-sm"
                    onClick={() => router.push(`/admin/employees/${emp.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
            {allEmployees.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
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
