import { FormEvent, useEffect, useState } from 'react';
import { LogData } from '../hooks/useLogsState';
import { currentYear, days, months, randomColor } from '../utils';
import EmojiPicker, { Categories, Emoji, EmojiStyle } from 'emoji-picker-react';
import Tile from './Tile';
import Legends from './Legends';
import Icon from './Icon';
import TextInput from './TextInput';
import Label from './Label';
import { produce } from 'immer';
import { set } from 'lodash';

interface MainSectionProps {
  data: LogData;
  editLog: (logData: LogData) => void;
}

function Main(props: MainSectionProps) {
  const { data } = props;
  const [year, setYear] = useState(currentYear);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    setYear(currentYear);
    setOpenEditModal(false);
  }, [data.id]);

  return (
    <div className='flex-1 max-h-screen overflow-scroll py-6 px-10'>
      <div className='min-w-fit'>
        <div className='flex gap-4 pl-6 items-center'>
          <Emoji unified={data.emoji} size={55} emojiStyle={EmojiStyle.NATIVE} />
          <div className='flex-1'>
            <h1 className='font-extrabold text-4xl my-3'>{data.name}</h1>
            <p className='text-xs'>{data.description}</p>
          </div>
          <button className='w-12 bg-neutral-100  hover:bg-neutral-200 p-3 rounded-full' onClick={() => setOpenEditModal(true)}>
            <Icon type='edit' />
          </button>
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
        {openEditModal && <EditModal {...props} closeModal={() => setOpenEditModal(false)} />}
      </div>
    </div>
  );
}

export default Main;

interface EditModalProps extends MainSectionProps {
  closeModal: () => void;
}

const EditModal = ({ data, closeModal, editLog }: EditModalProps) => {
  const [values, setValues] = useState(data);

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

    setValues(
      produce(values, (draft) => {
        draft.keys.push({
          value: draft.keys[draft.keys.length - 1].value + 1,
          label: '',
          color: getNewRandomColor(),
        });
      })
    );

    setTimeout(() => {
      (e.target as HTMLButtonElement).disabled = false;
    }, 400);
  };

  const deleteKey = (value: number) => {
    setValues(
      produce(values, (draft) => {
        draft.keys = draft.keys.filter((key) => key.value !== value);
      })
    );
  };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editLog(values);
    closeModal();
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full z-[5000]'>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 -z-10' onClick={closeModal}></div>
      <div className='w-11/12 max-w-[450px] max-h-[90vh] mx-auto mt-[5vh] p-6 rounded-lg bg-white shadow-2xl overflow-scroll'>
        <div className='flex text-xl font-bold mb-4 items-center justify-between'>
          <h6>Edit log</h6>
          <button className='w-8 h-8 p-2 hover:bg-neutral-100  rounded-full' onClick={closeModal}>
            <Icon type='close' />
          </button>
        </div>
        <form className='grid gap-6 ' onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <div>
              <Emoji unified={values.emoji} size={60} emojiStyle={EmojiStyle.NATIVE} />
              <div className='hidden'>
                <EmojiPicker
                  emojiStyle={EmojiStyle.NATIVE}
                  previewConfig={{ showPreview: false }}
                  suggestedEmojisMode={undefined}
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
              </div>
            </div>
            <div className='flex-1'>
              <Label>Name</Label>
              <TextInput value={values.name} name='name' placeholder='Name' handleChange={handleChange} />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <TextInput value={values.description} name='description' placeholder='Description' handleChange={handleChange} />
          </div>
          <div>
            <Label>Keys</Label>
            <button type='button' className='mt-1 mb-3 px-2 py-1 rounded-md text-sm font-medium bg-neutral-200' onClick={addNewKey}>
              + New key
            </button>
            <div className='grid grid-cols-2 gap-2'>
              {values.keys.map((key, idx) => (
                <div key={key.value} className='flex relative rounded-md  min-w-fit items-center text-sm leading-4'>
                  <span
                    className='w-5 h-5  inline-block flex-shrink-0 absolute left-2.5 rounded-md'
                    style={{
                      background: key.color,
                    }}
                  ></span>
                  <TextInput value={key.label} name={`keys[${idx}].label`} placeholder='label' className='pl-10 pr-8' handleChange={handleChange} />
                  {idx >= data.keys.length && (
                    <button type='button' className='w-5 h-5 p-1 flex-shrink-0 absolute right-2 rounded-full hover:bg-neutral-200' onClick={() => deleteKey(key.value)}>
                      <Icon type='close' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button type='submit' className='text-white bg-gray-900  font-bold rounded-full w-auto px-8 py-3 text-center float-right'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
