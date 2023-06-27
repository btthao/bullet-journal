import React from 'react';
import { LogData } from '../hooks/useLogsData';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

const LogTab: React.FC<LogData> = ({ emoji, name, description }) => {
  return (
    <div role='button' className='flex truncate pl-5 pr-3 pt-1 pb-3 rounded-md hover:bg-blue-200'>
      <Emoji unified={emoji} size={24} emojiStyle={EmojiStyle.NATIVE} />
      <div className='pl-3 text-sm truncate pt-2'>
        <div className='font-bold truncate'>{name}</div>
        <div className='truncate text-xs font-medium'>{description}</div>
      </div>
    </div>
  );
};

export default LogTab;
