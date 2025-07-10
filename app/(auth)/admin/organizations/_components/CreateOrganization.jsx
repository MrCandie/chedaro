"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateOrganization({ setShowModal, setOrgs }) {
  const [newOrgName, setNewOrgName] = useState("");

  const handleCreateOrganization = (e) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    const newOrg = {
      id: uuidv4(),
      name: newOrgName,
      createdAt: new Date().toISOString(),
      employees: [],
    };

    setOrgs((prev) => [...prev, newOrg]);
    setNewOrgName("");
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
        <form onSubmit={handleCreateOrganization}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Organization name"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
