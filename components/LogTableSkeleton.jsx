export default function LogTableSkeleton() {
  const skeletonRows = Array(6).fill(null);

  return (
    <div className="overflow-x-auto bg-white rounded shadow animate-pulse">
      <table className="min-w-full">
        <thead className="bg-blue-100 border-b">
          <tr>
            <th className="text-left px-4 py-3">Timestamp</th>
            <th className="text-left px-4 py-3">User</th>
            <th className="text-left px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, i) => (
            <tr key={i} className="border-b border-b-blue-100">
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-40" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-32" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-56" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
