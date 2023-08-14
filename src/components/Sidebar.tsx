import { Emoji, EmojiStyle } from 'emoji-picker-react';
import LogTab from './LogTab';
import Username from './Username';
import { LogsStateAndMethods } from '../hooks/useLogsState';

type SidebarProps = LogsStateAndMethods;

function Sidebar({ state, selectLog, createNewLog }: SidebarProps) {
  const { activeLogIdx, logs } = state;

  return (
    <div className='w-[16rem] min-w-[16rem] max-h-screen overflow-scroll  bg-neutral-50'>
      <div className='sticky top-0 bg-neutral-50 z-50 px-3 py-5'>
        <Username />
        <div role='button' className='flex truncate px-3 pb-3 pt-2 rounded-md  border border-gray-200  hover:bg-gray-200 mt-6' onClick={createNewLog}>
          <Emoji unified={'270d-fe0f'} size={24} emojiStyle={EmojiStyle.NATIVE} />
          <div className='pl-6 text-sm truncate'>
            <div className='font-bold  truncate pt-1 text-zinc-500'>New log</div>
          </div>
        </div>
      </div>
      <div className='grid gap-1 px-3 pb-5'>
        {logs.map((log, idx) => (
          <LogTab key={log.id} {...log} idx={idx} onClick={() => selectLog(idx)} active={activeLogIdx == idx} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
