import { useCallback, useReducer } from 'react';
import { createUniqueId, currentYear, initEmptyLog, Date } from '../utils';
import { produce } from 'immer';

const ACTION_TYPE_SELECT_LOG = 'select log';
const ACTION_TYPE_CREATE_NEW_LOG = 'new log';
const ACTION_TYPE_DELETE_LOG = 'delete log';
const ACTION_TYPE_EDIT_LOG = 'edit log';
const ACTION_TYPE_SELECT_YEAR = 'select year';
const ACTION_TYPE_SELECT_DATE = 'select date';
const ACTION_TYPE_LOG_DAY = 'log day';
const ACTION_TYPE_DISPLAY_EDIT_MODAL = 'show edit modal';
const ACTION_TYPE_DISMISS_MODAL = 'dismiss modal';

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
  selectedYear: number;
  selectedDate: Date | null;
  showEditModal: boolean;
  showLogDayModal: boolean;
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
  selectedYear: currentYear,
  selectedDate: null,
  showEditModal: false,
  showLogDayModal: false,
};

type Payload = {
  logIdx?: number;
  logData?: LogData;
  year?: number;
  date?: Date | null;
  keyValue?: number;
};

function reduce(state: LogsState, action: { payload?: Payload; type: string }): LogsState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE_SELECT_LOG: {
      if (typeof payload?.logIdx !== 'number') return state;
      return {
        ...DEFAULT_STATE,
        activeLogIdx: payload.logIdx,
        logs: state.logs,
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
        ...DEFAULT_STATE,
        activeLogIdx: state.logs.length,
        logs: [...state.logs, emptyLog],
      };
    }

    case ACTION_TYPE_DELETE_LOG: {
      return {
        ...DEFAULT_STATE,
        activeLogIdx: 0,
        logs: state.logs.filter((_, idx) => idx !== state.activeLogIdx),
      };
    }

    case ACTION_TYPE_EDIT_LOG: {
      return produce(state, (draft) => {
        if (payload?.logData) {
          draft.logs[draft.activeLogIdx] = payload.logData;
        }
      });
    }

    case ACTION_TYPE_LOG_DAY: {
      if (!payload?.keyValue || !state.selectedDate) return state;

      const {
        activeLogIdx,
        logs,
        selectedDate: { day, month, year },
      } = state;

      if (!logs[activeLogIdx].data[year] || !month || !day) return state;

      return produce(state, (draft) => {
        draft.logs[activeLogIdx].data[year][month][day] = payload.keyValue as number;
      });
    }

    case ACTION_TYPE_SELECT_YEAR: {
      if (payload?.year == undefined) return state;

      return {
        ...state,
        selectedYear: payload.year,
      };
    }

    case ACTION_TYPE_SELECT_DATE: {
      if (!payload?.date) return state;

      return {
        ...state,
        selectedDate: payload.date,
        showEditModal: false,
        showLogDayModal: true,
      };
    }

    case ACTION_TYPE_DISPLAY_EDIT_MODAL: {
      return {
        ...state,
        selectedDate: null,
        showEditModal: true,
        showLogDayModal: false,
      };
    }

    case ACTION_TYPE_DISMISS_MODAL: {
      return {
        ...state,
        selectedDate: null,
        showLogDayModal: false,
        showEditModal: false,
      };
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

    return { ...DEFAULT_STATE, logs };
  });

  const selectLog = useCallback((logIdx: number) => {
    dispatch({ type: ACTION_TYPE_SELECT_LOG, payload: { logIdx } });
  }, []);

  const createNewLog = useCallback(() => {
    dispatch({ type: ACTION_TYPE_CREATE_NEW_LOG });
  }, []);

  const deleteLog = useCallback(() => {
    dispatch({ type: ACTION_TYPE_DELETE_LOG });
  }, []);

  const editLog = useCallback((logData: LogData) => {
    dispatch({ type: ACTION_TYPE_EDIT_LOG, payload: { logData } });
  }, []);

  const logDay = useCallback((keyValue: Payload['keyValue']) => {
    dispatch({ type: ACTION_TYPE_LOG_DAY, payload: { keyValue } });
  }, []);

  const selectDate = useCallback((date: Payload['date']) => {
    dispatch({ type: ACTION_TYPE_SELECT_DATE, payload: { date } });
  }, []);

  const selectYear = useCallback((year: number) => {
    dispatch({ type: ACTION_TYPE_SELECT_YEAR, payload: { year } });
  }, []);

  const displayEditModal = useCallback(() => {
    dispatch({ type: ACTION_TYPE_DISPLAY_EDIT_MODAL });
  }, []);

  const dismissModal = useCallback(() => {
    dispatch({ type: ACTION_TYPE_DISMISS_MODAL });
  }, []);

  return { state, createNewLog, selectLog, editLog, logDay, deleteLog, displayEditModal, dismissModal, selectDate, selectYear };
};

export type LogsStateAndMethods = ReturnType<typeof useLogsState>;

export default useLogsState;
