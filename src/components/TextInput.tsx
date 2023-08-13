import React, { useEffect, useState } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
}

const Input = ({ className, handleChange, ...props }: InputProps) => {
  const [value, setValue] = useState(props.value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timeout');
      handleChange(props.name, value);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return <input {...props} value={value} onChange={onChange} className={`border bg-neutral-50 border-gray-200 text-sm rounded-md block w-full p-2.5 ${className} ${props.required && !value ? 'border-red-600' : ''}`} type='text' />;
};

export default Input;
