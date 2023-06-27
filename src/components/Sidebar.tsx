import { LogData } from '../hooks/useLogsData';
import LogTab from './LogTab';
import Username from './Username';

interface SidebarProps {
  data: LogData[];
  activeLog: number;
  select: (idx: number) => void;
}

function Sidebar({ data, select, activeLog }: SidebarProps) {
  return (
    <div className='w-[16rem] min-w-[16rem] max-h-screen overflow-scroll py-5 px-3 bg-neutral-100'>
      <Username />
      <div className='grid gap-2 pt-4'>
        {data.map((log, idx) => (
          <LogTab key={log.id} {...log} onClick={() => select(idx)} active={activeLog == idx} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
