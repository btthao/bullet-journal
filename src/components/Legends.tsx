import React from 'react';
import { Key } from '../hooks/useLogsState';

interface LegendsProps {
  legends: Key[];
}

const Legends: React.FC<LegendsProps> = ({ legends }) => {
  return (
    <div className='w-full mt-3 pl-10'>
      <div className='flex flex-wrap gap-4'>
        {legends.map((key) => (
          <div key={key.value} className='flex min-w-fit items-center text-sm leading-4'>
            <span
              className='w-5 h-5 mr-2 inline-block flex-shrink-0'
              style={{
                background: key.color,
              }}
            ></span>
            <p>{key.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legends;
