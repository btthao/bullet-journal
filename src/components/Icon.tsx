import React from 'react';

interface IconProps {
  type: string;
}

const Icon: React.FC<IconProps> = ({ type }) => {
  let Svg = null;

  switch (type) {
    case 'edit':
      Svg = Edit;
      break;

    case 'close':
      Svg = Close;
      break;

    case 'color-picker':
      Svg = ColorPicker;
      break;

    case 'chevron-down':
      Svg = ChevronDown;
      break;

    default:
      throw Error(`Invalid icon type "${type}"`);
  }

  return <Svg />;
};

export default Icon;

const Edit = () => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      <path
        d='M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L12 6.43872M19.9213 9.63993L14.6607 14.9006L11.5613 18L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021M2.32181 19.8021L3.41556 16.5208C3.67368 15.7465 3.80273 15.3593 3.97634 14.995C4.18114 14.5653 4.43213 14.1592 4.7249 13.7838C4.97308 13.4656 5.26166 13.1771 5.83882 12.5999L8.5 9.93872'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      ></path>
    </g>
  </svg>
);

const Close = () => (
  <svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      <path d='M8 8L40 40' stroke='currentColor' strokeWidth='5.5' strokeLinecap='round' strokeLinejoin='round'></path> <path d='M8 40L40 8' stroke='currentColor' strokeWidth='5.5' strokeLinecap='round' strokeLinejoin='round'></path>
    </g>
  </svg>
);

const ColorPicker = () => (
  <svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='currentColor'>
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      <rect x='0' fill='none' width='20' height='20'></rect>
      <g>
        <path d='M17.8 2.2c-1-1-2.6-1-3.6 0L12.4 4l-.7-.7c-.4-.4-1-.4-1.4 0l-.8.7c-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l.7-.7c.4-.4.4-1 0-1.4l-.6-.7 1.8-1.8c1-1 1-2.6 0-3.6zM4.4 12c-2.2 2.2-.9 3.2-2.9 5.8l.7.7c2.6-2 3.6-.7 5.8-2.9l5.1-5.1-3.6-3.6L4.4 12z'></path>
      </g>
    </g>
  </svg>
);

const ChevronDown = () => (
  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      <path d='M6 9L12 15L18 9' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'></path>
    </g>
  </svg>
);
