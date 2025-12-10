import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <input
        className={`w-full bg-zinc-900/50 border ${error ? 'border-red-900 focus:border-red-500' : 'border-zinc-800 focus:border-white'} text-white p-3 text-sm placeholder-zinc-700 focus:outline-none focus:ring-0 transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};