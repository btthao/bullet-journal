import { useEffect, useState } from 'react';
import { LogData } from '../hooks/useLogsState';
import { currentYear, days, months } from '../utils';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import Tile from './Tile';
import Legends from './Legends';

interface MainSectionProps {
  data: LogData;
}

function Main({ data }: MainSectionProps) {
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    setYear(currentYear);
  }, [data.id]);

  if (!Object.keys(data.data).length) {
    return <div className='flex-1 max-h-screen overflow-scroll p-10'>New log</div>;
  }

  return (
    <div className='flex-1 max-h-screen overflow-scroll py-6 px-10'>
      <div className='min-w-fit'>
        <div className='flex gap-4 pl-6'>
          <Emoji unified={data.emoji} size={55} emojiStyle={EmojiStyle.NATIVE} />
          <div>
            <h1 className='font-extrabold text-4xl my-3'>{data.name}</h1>
            <p className='text-xs'>{data.description}</p>
          </div>
        </div>
        <Legends legends={data.keys} />
        <div>
          {months.map((_, month) => (
            <div key={month} className='flex'>
              {days.map((day) => (
                <Tile key={day} data={month > 0 && day > 0 ? data.data[year][month - 1][day - 1] : null} day={day} month={month} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
