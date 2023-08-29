import React from 'react';
import { months, Date } from '../utils';

interface TileProps {
  date: Date;
  disabled: boolean;
  onClick: (date: Date) => void;
  color: string | undefined;
}

const Tile: React.FC<TileProps> = ({ date, onClick, color, disabled = false }) => {
  const { day, month } = date;
  let className = month == 0 || day == 0 ? 'bg-white border-white' : disabled ? 'bg-gray-200' : 'bg-neutral-50 cursor-pointer';

  if (month > 0 && day == 1) className += ' border-l-[1px] ';
  if (month > 0 && day == 31) className += ' border-r-[1px] ';
  if (month == 1 && day > 0) className += ' border-t-[1px] ';
  if (month == 12 && day > 0) className += ' border-b-[1px] ';

  return (
    <div
      className={`flex-1 border-[0.5px] min-w-[23px] aspect-square grid place-items-center text-xs font-semibold ${className}`}
      onClick={() => {
        if (!disabled) onClick(date);
      }}
      style={{
        background: color,
      }}
    >
      {day == 0 && month !== 0 && months[month]}
      {day !== 0 && month == 0 && day}
    </div>
  );
};

export default Tile;
