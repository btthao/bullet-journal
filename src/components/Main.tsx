import { useState } from 'react';
import { LogData } from '../hooks/useLogsData';
import { currentYear } from '../utils';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

interface MainSectionProps {
  data: LogData;
}

function Main({ data }: MainSectionProps) {
  const [year, setYear] = useState(currentYear);

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className='flex-1 max-h-screen overflow-scroll p-10'>
      <div className='min-w-fit'>
        <Emoji unified={data.emoji} size={55} emojiStyle={EmojiStyle.NATIVE} />
        <h1 className='font-extrabold text-4xl my-5'>{data.name}</h1>
        <div className='border-[0.5px]'>
          {data.data[year].map((month, monthIdx) => (
            <div key={monthIdx} className='flex'>
              {month.map((day, dayIdx) => (
                <div key={dayIdx} className={`flex-1  border-[0.5px] min-w-[20px] aspect-square  ${day == null ? 'bg-gray-200' : 'bg-neutral-50'}`}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
