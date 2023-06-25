import { useCallback, useReducer } from 'react';
import { createUniqueId, currentYear, initEmptyLog } from '../utils';

const ACTION_TYPE_CREATE_NEW_LOG = 'new log';

interface Key {
  value: number;
  label: string;
  color: string;
}

export interface LogData {
  id: number;
  name: string;
  description: string;
  keys: Key[];
  data: Record<string, (number | null)[][]>;
}

export const DEFAULT_LOGS: LogData[] = [
  {
    id: createUniqueId(),
    name: 'Rate my day',
    description: 'On a scale of 1-5, how okay was your day today?',
    keys: [
      {
        value: 1,
        label: 'Totally not okay',
        color: 'pink',
      },
      {
        value: 2,
        label: "I've had better days",
        color: 'red',
      },
      {
        value: 3,
        label: 'Meh',
        color: 'green',
      },
      {
        value: 4,
        label: 'It was a good day',
        color: 'purple',
      },
      {
        value: 5,
        label: 'Absolutely glamorous',
        color: 'blue',
      },
    ],
    data: {
      [currentYear]: initEmptyLog(currentYear),
    },
  },
];

function reduce(state: LogData[], action: { payload?: string; type: string }) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE_CREATE_NEW_LOG: {
      console.log('create new log');
      return state;
    }

    default: {
      return state;
    }
  }
}

const useLogsData = (data: LogData[]) => {
  const [state, dispatch] = useReducer(reduce, data.length ? data : DEFAULT_LOGS);

  const createNewLog = useCallback(() => {
    dispatch({ type: ACTION_TYPE_CREATE_NEW_LOG });
  }, []);

  return { state, createNewLog };
};

export default useLogsData;
