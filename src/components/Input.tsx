import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  registration?: UseFormRegisterReturn;
  error?: string;
};

export default function Input({
  label,
  registration,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        {...registration}
        {...props}
        className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}