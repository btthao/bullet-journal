import React from 'react';
import { months, Date, isItToday } from '../utils';
import Icon from './Icon';

interface TileProps {
  date: Date;
  disabled: boolean;
  onClick: (date: Date) => void;
  color: string | undefined;
}

const Tile: React.FC<TileProps> = ({ date: { date, month, year }, onClick, color, disabled = false }) => {
  let className = month == 0 || date == 0 ? 'bg-white border-white' : disabled ? 'bg-gray-200' : 'bg-neutral-50 cursor-pointer text-green-600';

  if (month > 0 && date == 1) className += ' border-l-[1px] ';
  if (month > 0 && date == 31) className += ' border-r-[1px] ';
  if (month == 1 && date > 0) className += ' border-t-[1px] ';
  if (month == 12 && date > 0) className += ' border-b-[1px] ';

  return (
    <div
      className={`flex-1 border-[0.5px] min-w-[23px] aspect-square grid place-items-center text-xs font-semibold ${className}`}
      onClick={() => {
        if (!disabled) onClick({ date, month, year });
      }}
      style={{
        background: color,
      }}
    >
      {date == 0 && month !== 0 && months[month]}
      {date !== 0 && month == 0 && date}
      {isItToday({ date, month, year }) && (
        <span className='inline-block w-full h-full p-1'>
          <Icon type='pin' />
        </span>
      )}
    </div>
  );
};

export default Tile;
