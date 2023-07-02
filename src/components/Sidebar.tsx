import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { LogData } from '../hooks/useLogsState';
import LogTab from './LogTab';
import Username from './Username';

interface SidebarProps {
  data: LogData[];
  activeLog: number;
  selectLog: (idx: number) => void;
  createNewLog: () => void;
}

function Sidebar({ data, selectLog, activeLog, createNewLog }: SidebarProps) {
  return (
    <div className='w-[16rem] min-w-[16rem] max-h-screen overflow-scroll  bg-neutral-50'>
      <div className='sticky top-0 bg-neutral-50 z-50 px-3 py-5'>
        <Username />
        <div role='button' className='flex truncate pl-5 pr-3 pb-3 pt-2 rounded-md  border border-gray-200  hover:bg-gray-700 hover:text-white mt-6' onClick={createNewLog}>
          <Emoji unified={'270d-fe0f'} size={22} emojiStyle={EmojiStyle.NATIVE} />
          <div className='pl-3 text-sm truncate'>
            <div className='font-bold  truncate pt-1'>New log</div>
          </div>
        </div>
      </div>
      <div className='grid gap-1 px-3 pb-5'>
        {data.map((log, idx) => (
          <LogTab key={log.id} {...log} idx={idx} onClick={() => selectLog(idx)} active={activeLog == idx} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
