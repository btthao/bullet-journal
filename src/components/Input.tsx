import React from 'react';

const Input: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({ className, ...props }) => {
  return <input {...props} className={`border bg-neutral-50 border-gray-200 text-sm rounded-md block w-full p-2.5 ${className}`} />;
};

export default Input;
