import React from 'react';

const Label: React.FC<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>> = (props) => {
  return <label {...props} className='block mb-1 text-xs font-medium text-zinc-500 ' />;
};

export default Label;
