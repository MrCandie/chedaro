"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export function PasswordInput({
  label = "Password",
  id = "password",
  value,
  onChange,
  required = false,
  className,
  info,
  register,
  name,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      )}

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        {...(register && name ? register(name) : {})}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute top-[37px] right-3 text-gray-400 hover:text-white focus:outline-none"
        tabIndex={-1}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      {info && <span className="text-red-500 text-md">{info}</span>}
    </div>
  );
}
