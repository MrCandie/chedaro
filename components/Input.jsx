import React from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  className,
  info,
  register,
  name,
  inputType = "input",
  options = [],
  ...props
}) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      )}
      {inputType === "input" && (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded"
          {...(register && name ? register(name) : {})}
          {...props}
        />
      )}

      {inputType === "select" && (
        <select
          required={required}
          className="w-full p-2 border rounded"
          {...(register && name ? register(name) : {})}>
          {options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.label}
            </option>
          ))}
        </select>
      )}

      {info && <span className="text-red-500 text-md">{info}</span>}
    </div>
  );
}
