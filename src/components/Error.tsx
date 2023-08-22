import React from 'react';

const Error: React.FC = () => {
  const refresh = () => {
    window.location.reload();
  };

  const clearData = () => {
    window.localStorage.removeItem('logs');
    refresh();
  };

  return (
    <div className='mx-auto w-11/12 max-w-[500px] mt-10 bg-red-100  p-4 rounded-lg '>
      <h1 className='text-2xl font-bold '>Something went wrong!</h1>
      <h2 className='text-lg font-semibold text-red-700'>Try refreshing the app first!</h2>
      <p>If it still doesn't work then we might have to reset all your data. Click delete button below with caution.</p>
      <div className='flex mx-auto gap-4 w-fit text-lg font-semibold mt-5'>
        <button onClick={refresh} className='bg-green-600 text-green-100 py-2 px-4 rounded-lg'>
          Refresh
        </button>
        <button onClick={clearData} className='bg-red-600 text-red-100 py-2 px-4 rounded-lg'>
          Delete Data
        </button>
      </div>
    </div>
  );
};

export default Error;
