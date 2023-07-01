import React from 'react';
import { LogData } from '../hooks/useLogsState';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

interface LogTabProps extends LogData {
  active: boolean;
  onClick: () => void;
}

const LogTab: React.FC<LogTabProps> = ({ emoji, name, description, onClick, active }) => {
  return (
    <div role='button' className={`flex truncate pl-5 pr-3 pt-1 pb-3 rounded-md border ${active ? 'bg-primary border-primary' : 'border-neutral-50'}  `} onClick={onClick}>
      <Emoji unified={emoji} size={24} emojiStyle={EmojiStyle.NATIVE} />
      <div className='pl-3 text-sm truncate pt-2'>
        <div className='font-bold truncate'>{name}</div>
        <div className='truncate text-xs font-medium'>{description}</div>
      </div>
    </div>
  );
};

export default LogTab;
