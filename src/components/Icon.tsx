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
  <svg fill='currentColor' version='1.1' id='Icons' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 32 32' xmlSpace='preserve'>
    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      <path d='M27.7,3.3c-1.5-1.5-3.9-1.5-5.4,0L17,8.6l-1.3-1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.3,1.3L5,20.6 c-0.6,0.6-1,1.4-1.1,2.3C3.3,23.4,3,24.2,3,25c0,1.7,1.3,3,3,3c0.8,0,1.6-0.3,2.2-0.9C9,27,9.8,26.6,10.4,26L21,15.4l1.3,1.3 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L22.4,14l5.3-5.3C29.2,7.2,29.2,4.8,27.7,3.3z M9,24.6 c-0.4,0.4-0.8,0.6-1.3,0.5c-0.4,0-0.7,0.2-0.9,0.5C6.7,25.8,6.3,26,6,26c-0.6,0-1-0.4-1-1c0-0.3,0.2-0.7,0.5-0.8 c0.3-0.2,0.5-0.5,0.5-0.9c0-0.5,0.2-1,0.5-1.3L17,11.4l2.6,2.6L9,24.6z'></path>
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
