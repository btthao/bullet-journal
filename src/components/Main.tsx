import { FormEvent, useState } from 'react';
import { LogData, LogsStateAndMethods } from '../hooks/useLogsState';
import { getDayOfWeek, randomColor, Date } from '../utils';
import EmojiPicker, { Categories, Emoji, EmojiStyle } from 'emoji-picker-react';
import Tile from './Tile';
import Legends from './Legends';
import Icon from './Icon';
import TextInput from './TextInput';
import Label from './Label';
import { produce } from 'immer';
import { set } from 'lodash';
import { HexColorPicker } from 'react-colorful';
import Select from './Select';
import Modal from './Modal';

type MainSectionProps = LogsStateAndMethods;

function Main(props: MainSectionProps) {
  const { state, deleteLog, createNewLog, dismissModal, selectDate, selectYear, displayEditModal, editLog, logDay } = props;
  const { selectedDate, showEditModal, showLogDayModal, selectedYear } = state;
  const data = state.logs[state.activeLogIdx];

  if (!data) {
    return (
      <div className='flex-1 max-h-screen overflow-scroll py-6 px-10'>
        <div className='min-w-fit text-center'>
          <h1 className='text-3xl font-bold mt-10'>Wow, such emptiness!</h1>
          <button className='bg-green-500 py-2 px-4 mt-4 rounded-md font-semibold text-white' onClick={createNewLog}>
            Create new log
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 max-h-screen overflow-scroll py-6 px-10'>
      <div className='min-w-fit'>
        <div className='flex gap-4 pl-6 items-center'>
          <Emoji unified={data.emoji} size={55} emojiStyle={EmojiStyle.NATIVE} />
          <div className='flex-1'>
            <h1 className='font-extrabold text-4xl my-3'>{data.name}</h1>
            <p className='text-xs'>{data.description}</p>
          </div>
          <button className='w-10 bg-neutral-100  hover:bg-neutral-200 p-3 rounded-full' onClick={displayEditModal}>
            <Icon type='edit' />
          </button>
          <button className='w-10 bg-red-100 text-red-700  hover:bg-red-200 p-3 rounded-full' onClick={deleteLog}>
            <Icon type='bin' />
          </button>
        </div>
        <div className='flex items-start gap-6 my-5'>
          <Legends legends={data.keys} />
          <Select
            options={Object.keys(data.data).sort((a, b) => parseInt(b) - parseInt(a))}
            value={selectedYear}
            onChange={(e) => {
              selectYear(parseInt(e.currentTarget.value));
            }}
          />
        </div>
        <div>
          {data.data[selectedYear].map((monthData, month) => (
            <div key={month} className='flex'>
              {monthData.map((dateData, date) => (
                <Tile key={date} disabled={dateData == null} color={data.keys.find((key) => key.value == dateData)?.color} date={{ date, month, year: selectedYear }} onClick={selectDate} />
              ))}
            </div>
          ))}
        </div>
        {showEditModal && (
          <Modal title='Edit log' handleClose={dismissModal}>
            <EditForm data={data} dismissModal={dismissModal} editLog={editLog} />
          </Modal>
        )}
        {showLogDayModal && selectedDate && (
          <Modal title={`${getDayOfWeek(selectedDate)} ${selectedDate.date}/${selectedDate.month}/${selectedDate.year}`} handleClose={dismissModal}>
            <LogDayForm data={data} date={selectedDate} logDay={logDay} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Main;

interface EditFormProps extends Required<Pick<LogsStateAndMethods, 'editLog' | 'dismissModal'>> {
  data: LogData;
}

const EditForm = ({ data, editLog, dismissModal }: EditFormProps) => {
  const [values, setValues] = useState(data);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedKeyIdx, setSelectedKeyIdx] = useState<number | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues(
      produce(values, (draft) => {
        set(draft, name, value);
      })
    );
  };

  const getNewRandomColor = () => {
    const colors = new Set(values.keys.map((key) => key.color));

    let newColor = randomColor();

    while (colors.has(newColor)) {
      newColor = randomColor();
    }

    return newColor;
  };

  const addNewKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    //   prevent user clicking too fast before set state
    (e.target as HTMLButtonElement).disabled = true;

    setSelectedKeyIdx(null);
    setValues(
      produce(values, (draft) => {
        draft.keys.push({
          value: draft.keys[draft.keys.length - 1].value + 1,
          label: 'new key',
          color: getNewRandomColor(),
        });
      })
    );

    setTimeout(() => {
      (e.target as HTMLButtonElement).disabled = false;
    }, 400);
  };

  const deleteKey = (value: number) => {
    setSelectedKeyIdx(null);
    setValues(
      produce(values, (draft) => {
        draft.keys = draft.keys.filter((key) => key.value !== value);
      })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editLog(values);
    dismissModal();
  };

  return (
    <form className='grid gap-6 ' onSubmit={handleSubmit}>
      <div className='flex gap-4'>
        <div className='relative p-1 grid place-items-center'>
          <Emoji unified={values.emoji} size={60} emojiStyle={EmojiStyle.NATIVE} />
          <div role='button' className='absolute w-full h-full top-0 left-0 bg-neutral-900 bg-opacity-40 grid place-items-center rounded-md text-white opacity-0 hover:opacity-100' onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <div className='w-9'>
              <Icon type='edit' />
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <Label>Name</Label>
          <TextInput value={values.name} name='name' placeholder='Name' handleChange={handleChange} required />
        </div>
      </div>
      <div>
        <Label>Description</Label>
        <TextInput value={values.description} name='description' placeholder='Description' handleChange={handleChange} required />
      </div>
      <div>
        <Label>Keys</Label>
        <button type='button' className='mt-1 mb-3 px-2 py-1 rounded-md text-sm font-medium bg-neutral-200' onClick={addNewKey}>
          + New key
        </button>
        <div className='grid gap-2'>
          {values.keys.map((key, idx) => (
            <div key={key.value} className='flex relative rounded-md  min-w-fit items-center text-sm leading-4'>
              <span
                className='w-5 h-5  inline-block flex-shrink-0 absolute left-2.5 rounded-md'
                style={{
                  background: key.color,
                }}
              ></span>
              <TextInput value={key.label} name={`keys[${idx}].label`} placeholder='label' className='pl-10 pr-14' handleChange={handleChange} required />
              <div className='flex-shrink-0 absolute right-1 text-neutral-500'>
                <button type='button' className='w-6 h-6 p-1 rounded-full hover:bg-neutral-200' onClick={() => setSelectedKeyIdx(idx)}>
                  <Icon type='color-picker' />
                </button>
                {idx >= data.keys.length && (
                  <button type='button' className='w-6 h-6 p-1 rounded-full hover:bg-neutral-200' onClick={() => deleteKey(key.value)}>
                    <Icon type='close' />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {showEmojiPicker && (
          <div className='fixed bottom-0 left-1 z-50'>
            <EmojiPicker
              width={280}
              height={340}
              emojiStyle={EmojiStyle.NATIVE}
              previewConfig={{ showPreview: false }}
              suggestedEmojisMode={undefined}
              onEmojiClick={(emoji) => {
                handleChange('emoji', emoji.unified);
              }}
              categories={[
                { category: Categories.SMILEYS_PEOPLE, name: 'People' },
                { category: Categories.ACTIVITIES, name: 'Activities' },
                { category: Categories.ANIMALS_NATURE, name: 'Animals & Nature' },
                { category: Categories.FLAGS, name: 'Flags' },
                { category: Categories.FOOD_DRINK, name: 'Food & Drinks' },
                { category: Categories.OBJECTS, name: 'Objects' },
                { category: Categories.SYMBOLS, name: 'Symbols' },
                { category: Categories.TRAVEL_PLACES, name: 'Places' },
              ]}
            />
            <button className='absolute top-1 right-1 small-close-btn bg-neutral-200 z-10' onClick={() => setShowEmojiPicker(false)}>
              <Icon type='close' />
            </button>
          </div>
        )}
        {selectedKeyIdx !== null && values.keys[selectedKeyIdx]?.color && (
          <div className='fixed bottom-0 right-1 z-50 color-picker-wrapper pt-6 p-3'>
            <HexColorPicker
              color={values.keys[selectedKeyIdx].color}
              onChange={(newColor) => {
                handleChange(`keys[${selectedKeyIdx}].color`, newColor);
              }}
            />
            <button className='absolute top-1 right-1 small-close-btn bg-neutral-200 z-10' onClick={() => setSelectedKeyIdx(null)}>
              <Icon type='close' />
            </button>
          </div>
        )}
      </div>
      <div>
        <button type='submit' className='text-white bg-gray-900  font-bold rounded-full w-auto px-8 py-3 text-center float-right'>
          Save
        </button>
      </div>
    </form>
  );
};

interface LogDayFormProps extends Required<Pick<LogsStateAndMethods, 'logDay'>> {
  date: Date;
  data: LogData;
}

const LogDayForm = ({ data, date: { date, month, year }, logDay }: LogDayFormProps) => {
  const keys = data.keys;
  const yearData = data.data[year];

  return (
    <div className='grid mt-6'>
      {keys.map((key) => (
        <div key={key.value} className='flex w-full'>
          <input type='radio' name='key' id={`${key.value}`} value={key.value} className='peer hidden' onChange={() => logDay(key.value)} checked={yearData[month][date] == key.value} />
          <Label htmlFor={`${key.value}`} className='flex items-center cursor-pointer select-none rounded-md px-3 py-4 peer-checked:bg-gray-200 flex-1'>
            <span
              className='w-6 h-6 mr-3 inline-block flex-shrink-0 rounded-md'
              style={{
                background: key.color,
              }}
            ></span>
            <span className='text-sm text-black'>{key.label}</span>
          </Label>
        </div>
      ))}
    </div>
  );
};
