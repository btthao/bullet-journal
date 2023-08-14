import React from 'react';
import Icon from './Icon';

interface SelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: (string | number)[];
}

const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <div className='relative'>
      <select {...props} className='h-10 w-20 bg-transparent rounded-lg text-sm p-2'>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className='absolute left-0 top-0 w-full h-full border border-gray-200 bg-neutral-100 rounded-lg -z-10 flex items-center justify-end'>
        <span className='w-4 h-4 mr-2'>
          <Icon type='chevron-down' />
        </span>
      </div>
    </div>
  );
};

export default Select;
