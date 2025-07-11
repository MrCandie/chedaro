"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/organization" },
    { name: "Audit Log", href: "/organization/logs" },
  ];
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 text-xl font-bold text-blue-600">
              OrgDash
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}>
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
