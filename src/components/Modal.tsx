import React, { ReactElement } from 'react';
import Icon from './Icon';

interface ModalProps {
  handleClose: () => void;
  title: string;
  children: ReactElement;
}

const Modal: React.FC<ModalProps> = ({ children, handleClose, title }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-[5000]'>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 -z-10' onClick={handleClose}></div>
      <div className='w-11/12 max-w-[450px] max-h-[90vh] mx-auto mt-[5vh] p-6 rounded-lg bg-white shadow-lg overflow-scroll'>
        <div className='flex text-xl font-bold mb-4 -mr-2 items-center justify-between'>
          <h6>{title}</h6>
          <button className='w-8 h-8 p-2 hover:bg-neutral-100  rounded-full' onClick={handleClose}>
            <Icon type='close' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
