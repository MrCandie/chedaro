"use client";

import useGet from "@/hooks/useGet";
import { url } from "@/hooks/lib";
import LogTableSkeleton from "@/components/LogTableSkeleton";

export default function AuditLogPage() {
  const { data, isPending } = useGet(`${url}/v1/logs`, "logs");

  const result = data?.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Audit Trail</h1>
      {isPending && <LogTableSkeleton />}

      {!isPending && (
        <div className="overflow-x-auto bg-white rounded shadow">
          {result?.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No logs available.
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-blue-100 border-b">
                <tr>
                  <th className="text-left px-4 py-3">Timestamp</th>
                  <th className="text-left px-4 py-3">User</th>
                  <th className="text-left px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {result?.map((log, i) => (
                  <tr
                    key={i}
                    className="border-b border-b-blue-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      {log.user.firstName} {log.user.lastName}
                    </td>

                    <td className="px-4 py-3">{log.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
