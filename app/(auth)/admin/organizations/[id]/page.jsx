"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock data
const mockOrganizations = [
  {
    id: "org001",
    name: "WakaFoody",
    createdAt: "2024-01-10T09:00:00Z",
    employees: [
      { id: "1", name: "Sylvia", email: "sylvia@waka.com" },
      { id: "2", name: "Tobi", email: "tobi@waka.com" },
    ],
  },
  {
    id: "org002",
    name: "SwiftFoods",
    createdAt: "2024-05-12T10:30:00Z",
    employees: [{ id: "3", name: "Lola", email: "lola@swift.com" }],
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
    actor: "Tobi",
    action: "deleted_user",
    target: "RandomGuy",
    timestamp: "2024-06-13T13:00:00Z",
    orgId: "org001",
  },
];

export default function ViewOrganizationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [org, setOrg] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const found = mockOrganizations.find((o) => o.id === id);
    if (found) {
      setOrg(found);
      const filteredLogs = mockAuditLogs.filter((log) => log.orgId === id);
      setLogs(filteredLogs);
    } else {
      router.push("/dashboard/superadmin/organizations");
    }
  }, [id, router]);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${org.name}?`)) {
      alert("Deleted organization (not really, just a mock).");
      router.push("/dashboard/superadmin/organizations");
    }
  };

  const handleUpdate = () => {
    alert("Update organization functionality not yet implemented.");
  };

  if (!org) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{org.name}</h1>
          <p className="text-sm text-gray-500">
            Created on {new Date(org.createdAt).toLocaleDateString()}
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
            {org.employees.map((emp) => (
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
            {org.employees.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Audit Logs Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs found for this organization.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-blue-100 border-b">
              <tr>
                <th className="text-left px-4 py-3">Timestamp</th>
                <th className="text-left px-4 py-3">Actor</th>
                <th className="text-left px-4 py-3">Action</th>
                <th className="text-left px-4 py-3">Target</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr
                  key={i}
                  className="border-b border-b-blue-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{log.actor}</td>
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
