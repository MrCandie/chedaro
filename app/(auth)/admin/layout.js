"use client";

import { url } from "@/hooks/lib";
import useGet from "@/hooks/useGet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { name: "Organizations", href: "/admin/organizations" },
  { name: "Employees", href: "/admin/employees" },
  { name: "Audit Logs", href: "/admin/logs" },
];

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isPending } = useGet(`${url}/v1/user`, "profile");

  useEffect(() => {
    if (isPending) return;
    if (data?.data?.userType !== "admin")
      return router.replace("/organization");
  }, [data?.data, router, isPending]);

  if (isPending)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Super Admin</h2>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={twMerge(
                "px-3 py-2 rounded hover:bg-gray-700",
                pathname === link.href && "bg-gray-700"
              )}>
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
