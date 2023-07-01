import { useCallback, useReducer } from 'react';
import { createUniqueId, currentYear, initEmptyLog } from '../utils';

const ACTION_TYPE_SELECT_LOG = 'select';
const ACTION_TYPE_CREATE_NEW_LOG = 'new log';

interface Key {
  value: number;
  label: string;
  color: string;
}

export interface LogData {
  id: number;
  emoji: string;
  name: string;
  description: string;
  keys: Key[];
  data: Record<string, (number | null)[][]>;
}

export interface LogsState {
  activeLogIdx: number;
  logs: LogData[];
}

export const DEFAULT_LOGS: LogData[] = [
  {
    id: createUniqueId(),
    emoji: '2b50',
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
  {
    id: createUniqueId() + 2,
    emoji: '2615',
    name: 'Caffeine',
    description: "What's your source of caffeine today?",
    keys: [
      {
        value: 1,
        label: 'Tea',
        color: 'brown',
      },
      {
        value: 2,
        label: 'Coffee',
        color: 'black',
      },
    ],
    data: {
      [currentYear]: initEmptyLog(currentYear),
    },
  },
];

export const DEFAULT_STATE: LogsState = {
  activeLogIdx: 0,
  logs: DEFAULT_LOGS,
};

function reduce(state: LogsState, action: { payload?: string | number; type: string }): LogsState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE_SELECT_LOG: {
      if (typeof payload !== 'number' || payload < 0 || payload >= state.logs.length) return state;
      return {
        ...state,
        activeLogIdx: payload,
      };
    }

    case ACTION_TYPE_CREATE_NEW_LOG: {
      const emptyLog: LogData = {
        id: createUniqueId(),
        emoji: '1f4d9',
        name: 'Log #' + (state.logs.length + 1),
        keys: [],
        description: '',
        data: {},
      };
      return {
        activeLogIdx: state.logs.length,
        logs: [...state.logs, emptyLog],
      };
    }

    default: {
      return state;
    }
  }
}

const useLogsState = (initialState: LogsState) => {
  const [state, dispatch] = useReducer(reduce, initialState.logs?.length ? initialState : DEFAULT_STATE);

  const selectLog = useCallback((idx: number) => {
    dispatch({ type: ACTION_TYPE_SELECT_LOG, payload: idx });
  }, []);

  const createNewLog = useCallback(() => {
    dispatch({ type: ACTION_TYPE_CREATE_NEW_LOG });
  }, []);

  return { state, createNewLog, selectLog };
};

export default useLogsState;
