"use client";

import useGet from "@/hooks/useGet";
import { useParams, useRouter } from "next/navigation";
import { url } from "@/hooks/lib";
import { Fragment, useState } from "react";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import { useDelete } from "@/hooks/useDelete";
import UpdatePermissions from "@/app/(auth)/admin/employees/_components/UpdatePermisssions";

export default function ViewEmployeePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const { data, isPending } = useGet(
    `${url}/v1/employee/${id}`,
    "employee" + id
  );

  const result = data?.data;

  function handleSuccess() {
    router.back();
  }

  const deleteHandler = useDelete({
    url: `${url}/v1/employee/${id}`,
    queryKey: "employee" + id,
    title: `${result?.employee?.firstName} deleted`,
    onSuccess: handleSuccess,
  });

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleUpdatePermissions = () => {
    setShowPermissionModal(true);
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <Fragment>
      {showPermissionModal && (
        <UpdatePermissions
          permissions={result?.employee?.permissions}
          setShowModal={setShowPermissionModal}
        />
      )}
      {showDeleteModal && (
        <ConfirmActionModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          confirmText="Delete"
          onConfirm={() => deleteHandler.mutate({})}
          loading={deleteHandler.isPending}
        />
      )}
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
              <p className="text-lg font-semibold capitalize">
                {result?.employee?.firstName} {result?.employee?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="text-lg font-mono">{result?.employee?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="capitalize">{result?.employee?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p>{result?.employee?.organization?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p>{new Date(result?.employee?.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Permissions</h2>
          {result?.employee.permissions.length === 0 ? (
            <p className="text-gray-500">No permissions assigned.</p>
          ) : (
            <ul className="list-disc ml-6 text-gray-800">
              {result?.employee.permissions.map((perm, i) => (
                <li key={i}>{perm}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Audit Logs */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
          {result?.logs.length === 0 ? (
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
                {result?.logs.map((log, i) => (
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
    </Fragment>
  );
}
