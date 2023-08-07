import React from 'react';
import { LogData } from '../hooks/useLogsState';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

const colors = ['bg-[#AAC3A4]', 'bg-[#E4B877]', 'bg-[#C5A4C5]', 'bg-[#eb7089]', 'bg-[#AFD9EB]', 'bg-[#948f92]', 'bg-[#f6b8d0]', 'bg-[#cfcfcd]', 'bg-[#BDA58B]', 'bg-[#8794c7]'];

interface LogTabProps extends LogData {
  idx: number;
  active: boolean;
  onClick: () => void;
}

const LogTab: React.FC<LogTabProps> = ({ idx, emoji, name, onClick, active }) => {
  return (
    <div role='button' className={`flex truncate px-2 py-2 transition-all rounded-md ${colors[idx % colors.length]} hover:bg-opacity-25  ${active ? 'bg-opacity-25' : 'bg-opacity-0'}  relative`} onClick={onClick}>
      <div className={`h-full p-[6px] aspect-square grid place-items-center rounded-md ${colors[idx % colors.length]}`}>
        <Emoji unified={emoji} size={22} emojiStyle={EmojiStyle.NATIVE} />
      </div>
      <div className='font-bold text-zinc-600 truncate pl-5 pt-1'>{name}</div>
    </div>
  );
};

export default LogTab;
