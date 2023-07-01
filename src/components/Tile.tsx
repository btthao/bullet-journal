import React from 'react';
import { months } from '../utils';

interface TileProps {
  day: number;
  month: number;
  data: number | null;
}

const Tile: React.FC<TileProps> = ({ day, month, data }) => {
  const colorClass = month == 0 || day == 0 ? 'bg-white border-white' : data == null ? 'bg-gray-200' : 'bg-neutral-50';
  let borderClass = '';
  if (month > 0 && day == 1) borderClass += 'border-l-[1px] ';
  if (month > 0 && day == 31) borderClass += 'border-r-[1px] ';
  if (month == 1 && day > 0) borderClass += 'border-t-[1px] ';
  if (month == 12 && day > 0) borderClass += 'border-b-[1px] ';

  return (
    <div className={`flex-1 border-[0.5px] ${borderClass} ${colorClass} min-w-[23px] aspect-square grid place-items-center text-xs font-semibold `}>
      {day == 0 && month !== 0 && months[month]}
      {day !== 0 && month == 0 && day}
    </div>
  );
};

export default Tile;
