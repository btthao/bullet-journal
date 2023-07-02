import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_NAME = 'Mystery Bobtail';

const Username: React.FC = () => {
  const [name, setName] = useLocalStorage<string>('username', DEFAULT_NAME);
  const [prev, setPrev] = useState(name);

  useEffect(() => {
    if (!name) {
      setName(DEFAULT_NAME);
    }
  }, []);

  return (
    <div className='flex pt-5 w-full'>
      <span className='bg-gray-700 inline-grid place-items-center text-white w-8 h-8 rounded-md text-lg font-bold  uppercase'>{name ? name[0] : 'A'}</span>
      <div className='flex-1 ml-3'>
        <input
          className='w-full h-9 text-xl font-bold bg-transparent outline-none border-b-2  border-transparent focus:border-gray-400 hover:border-gray-400'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => {
            if (e.target.value == '') {
              setName(prev);
            } else {
              setPrev(name);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Username;
