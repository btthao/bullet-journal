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
    <div role='button' className={`flex truncate pl-6 pr-3 py-2 transition-all rounded-md ${colors[idx % colors.length]}  ${active ? 'mr-0' : 'mr-10'} hover:brightness-110 `} onClick={onClick}>
      <Emoji unified={emoji} size={20} emojiStyle={EmojiStyle.NATIVE} />
      <div className='font-bold truncate pl-3 text-sm'>{name}</div>
    </div>
  );
};

export default LogTab;
