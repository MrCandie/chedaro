"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data
const mockOrganizations = [
  {
    id: "org001",
    name: "WakaFoody",
    employees: [
      {
        id: "e001",
        name: "Sylvia",
        role: "orgadmin",
        createdAt: "2024-03-15T09:00:00Z",
        permissions: ["manage_users", "view_audit_trail"],
      },
    ],
  },
  {
    id: "org002",
    name: "SwiftFoods",
    employees: [
      {
        id: "e002",
        name: "Lola",
        role: "employee",
        createdAt: "2024-06-01T10:00:00Z",
        permissions: ["view_users"],
      },
    ],
  },
];

const mockAuditLogs = [
  {
    actor: "Sylvia",
    action: "created_user",
    target: "Tobi",
    timestamp: "2024-06-12T10:00:00Z",
    orgId: "org001",
  },
  {
    actor: "Sylvia",
    action: "deleted_user",
    target: "OldUser",
    timestamp: "2024-06-15T12:30:00Z",
    orgId: "org001",
  },
  {
    actor: "Lola",
    action: "viewed_report",
    target: "SalesData",
    timestamp: "2024-07-01T15:00:00Z",
    orgId: "org002",
  },
];

export default function ViewEmployeePage() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    for (const org of mockOrganizations) {
      const emp = org.employees.find((e) => e.id === id);
      if (emp) {
        setEmployee({ ...emp, organization: org.name, orgId: org.id });

        // Filter logs where actor is the employee
        const employeeLogs = mockAuditLogs.filter(
          (log) => log.actor === emp.name
        );
        setLogs(employeeLogs);
        return;
      }
    }

    router.push("/dashboard/superadmin/employees");
  }, [id, router]);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      alert("Deleted (not really, this is mock data)");
      router.push("/dashboard/superadmin/employees");
    }
  };

  const handleUpdatePermissions = () => {
    alert(`Open permission update modal for ${employee.name}`);
  };

  const handleChangeRole = () => {
    alert(`Open role change modal for ${employee.name}`);
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <div className="space-x-3">
          <button
            onClick={handleUpdatePermissions}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update Permissions
          </button>
          <button
            onClick={handleChangeRole}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Change Role
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{employee.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID</p>
            <p className="text-lg font-mono">{employee.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="capitalize">{employee.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Organization</p>
            <p>{employee.organization}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p>{new Date(employee.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Permissions</h2>
        {employee.permissions.length === 0 ? (
          <p className="text-gray-500">No permissions assigned.</p>
        ) : (
          <ul className="list-disc ml-6 text-gray-800">
            {employee.permissions.map((perm, i) => (
              <li key={i}>{perm}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Audit Logs */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs found for this employee.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3">Timestamp</th>
                <th className="text-left px-4 py-3">Action</th>
                <th className="text-left px-4 py-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="px-4 py-3">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
