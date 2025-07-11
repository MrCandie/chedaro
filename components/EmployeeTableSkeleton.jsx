export default function EmployeeTableSkeleton() {
  const skeletonRows = Array(6).fill(null);

  return (
    <div className="overflow-x-auto bg-white rounded shadow animate-pulse">
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
          {skeletonRows.map((_, i) => (
            <tr key={i} className="border-b border-b-blue-100">
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-28" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-24" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-20" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-32" />
              </td>
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-16" />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="h-8 bg-gray-300 rounded w-16 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
