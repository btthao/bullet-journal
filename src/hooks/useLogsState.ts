import { useCallback, useReducer } from 'react';
import { createUniqueId, currentYear, initEmptyLog, Date } from '../utils';
import { produce } from 'immer';

const ACTION_TYPE_SELECT_LOG = 'select';
const ACTION_TYPE_CREATE_NEW_LOG = 'new log';
const ACTION_TYPE_EDIT_LOG = 'edit log';
const ACTION_TYPE_LOG_DAY = 'log day';

export interface Key {
  value: number;
  label: string;
  color: string;
}

export interface LogData {
  [key: string]: unknown;
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
    description: 'How was your day?',
    keys: [
      {
        value: 1,
        label: 'Totally not okay',
        color: '#d8c196',
      },
      {
        value: 2,
        label: "I've had better days",
        color: '#bb9271',
      },
      {
        value: 3,
        label: 'Meh',
        color: '#50a7e0',
      },
      {
        value: 4,
        label: 'It was a good day',

        color: '#366e84',
      },
      {
        value: 5,
        label: 'Absolutely glamorous',

        color: '#386f43',
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
        color: '#fda17c',
      },
      {
        value: 2,
        label: 'Coffee',
        color: '#36210E',
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

type Payload = {
  selectedLogIdx?: number;
  logData?: LogData;
  date?: Date;
  keyValue?: number;
};

function reduce(state: LogsState, action: { payload?: Payload; type: string }): LogsState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE_SELECT_LOG: {
      if (typeof payload?.selectedLogIdx !== 'number') return state;
      return {
        ...state,
        activeLogIdx: payload.selectedLogIdx,
      };
    }

    case ACTION_TYPE_CREATE_NEW_LOG: {
      const emptyLog: LogData = {
        id: createUniqueId(),
        emoji: '1f4d9',
        name: 'Log #' + (state.logs.length + 1),
        keys: [
          {
            value: 1,
            label: '1',
            color: '#DB9B9A',
          },
          {
            value: 2,
            label: '2',
            color: '#829A58',
          },
        ],
        description: 'What do you want to log today?',
        data: {
          [currentYear]: initEmptyLog(currentYear),
        },
      };
      return {
        activeLogIdx: state.logs.length,
        logs: [...state.logs, emptyLog],
      };
    }
    case ACTION_TYPE_EDIT_LOG: {
      //   remove deleted keys
      return produce(state, (draft) => {
        if (payload?.logData) {
          draft.logs[draft.activeLogIdx] = payload.logData;
        }
      });
    }

    case ACTION_TYPE_LOG_DAY: {
      if (!payload?.date || !payload?.keyValue) return state;

      const { day, month, year } = payload.date;

      if (!month || !day) return state;

      const logs = state.logs;
      const yearData = logs[state.activeLogIdx].data[year];

      if (typeof yearData?.[month]?.[day] !== 'number') return state;

      yearData[month][day] = payload.keyValue;

      return { ...state, logs };
    }

    default: {
      return state;
    }
  }
}

const useLogsState = (initialState: LogsState) => {
  const [state, dispatch] = useReducer(reduce, null, () => {
    if (!initialState.logs?.length) return DEFAULT_STATE;

    const logs = initialState.logs;
    for (const log of logs) {
      if (!(currentYear in log.data)) {
        log.data[currentYear] = initEmptyLog(currentYear);
      }
    }

    return { ...initialState, logs };
  });

  const selectLog = useCallback((selectedLogIdx: number) => {
    dispatch({ type: ACTION_TYPE_SELECT_LOG, payload: { selectedLogIdx } });
  }, []);

  const createNewLog = useCallback(() => {
    dispatch({ type: ACTION_TYPE_CREATE_NEW_LOG });
  }, []);

  const editLog = useCallback((logData: LogData) => {
    dispatch({ type: ACTION_TYPE_EDIT_LOG, payload: { logData } });
  }, []);

  const logDay = useCallback((date: Payload['date'], keyValue: Payload['keyValue']) => {
    dispatch({ type: ACTION_TYPE_LOG_DAY, payload: { date, keyValue } });
  }, []);

  return { state, createNewLog, selectLog, editLog, logDay };
};

export type LogsStateAndMethods = ReturnType<typeof useLogsState>;

export default useLogsState;
