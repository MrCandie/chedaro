"use client";

import useGet from "@/hooks/useGet";
import { useEffect, useState } from "react";
import { url } from "@/hooks/lib";

// Mock logs
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

// Mock org mapping
const orgMap = {
  org001: "WakaFoody",
  org002: "SwiftFoods",
};

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);

  const { data, isPending } = useGet(
    `${url}/v1/organizations/logs`,
    "organizations-logs"
  );

  const result = data?.data;
  console.log(result);

  useEffect(() => {
    // Simulate fetch from API/localStorage
    setLogs(mockAuditLogs);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Audit Trail</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        {result?.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No logs available.
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-3">Timestamp</th>

                <th className="text-left px-4 py-3">Action</th>
                <th className="text-left px-4 py-3">User</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((log, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{log.name}</td>

                  <td className="px-4 py-3 capitalize">
                    {log.user?.firstName} {log?.user?.lastName}
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
