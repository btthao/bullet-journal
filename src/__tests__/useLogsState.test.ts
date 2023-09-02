import { createElement } from 'react';
import { ReactTestRenderer, act, create } from 'react-test-renderer';
import useLogsState, { DEFAULT_LOGS, LogData, LogsState } from '../hooks/useLogsState';
import { Date, currentYear, initEmptyLog } from '../utils';

describe('useLogsState', () => {
  let testRendererInstance: ReactTestRenderer;
  let logsState: LogsState;
  let selectLog: (logIdx: number) => void;
  let createLogs: (count: number) => void;
  let deleteLogs: (count: number) => void;
  let editLog: (logData: LogData) => void;
  let logDay: (keyValue: number) => void;
  let displayEditModal: () => void;
  let dismissModal: () => void;
  let selectDate: (date: Date) => void;
  let selectYear: (year: number) => void;

  function Component(initialState: LogsState) {
    const result = useLogsState(initialState);

    logsState = result.state;

    selectLog = (logIdx: number) => {
      act(() => result.selectLog(logIdx));
    };

    createLogs = (count: number) => {
      for (let i = 0; i < count; i++) {
        act(() => result.createNewLog());
      }
    };

    deleteLogs = (count: number) => {
      for (let i = 0; i < count; i++) {
        act(() => result.deleteLog());
      }
    };

    editLog = (logData: LogData) => {
      act(() => result.editLog(logData));
    };

    logDay = (keyValue: number) => {
      act(() => result.logDay(keyValue));
    };

    selectDate = (date: Date) => {
      act(() => result.selectDate(date));
    };

    selectYear = (year: number) => {
      act(() => result.selectYear(year));
    };

    displayEditModal = () => {
      act(() => result.displayEditModal());
    };

    dismissModal = () => {
      act(() => result.dismissModal());
    };

    return null;
  }

  beforeEach(() => {
    testRendererInstance = create(createElement(Component, {} as LogsState));
  });

  afterEach(() => {
    testRendererInstance?.unmount();
  });

  it('should initialize correctly', () => {
    expect(logsState.activeLogIdx).toBe(0);
    expect(logsState.logs).toHaveLength(2);
    expect(logsState.logs[0].data[currentYear]).toEqual(initEmptyLog(currentYear));
    expect(logsState.selectedDate).toBeNull();
    expect(logsState.selectedYear).toBe(currentYear);
    expect(logsState.showEditModal).toBeFalsy();
    expect(logsState.showLogDayModal).toBeFalsy();
  });

  it('should correctly create and delete log', () => {
    let clonedLogs = [];

    // add 3 logs => 5 logs
    createLogs(3);
    expect(logsState.logs).toHaveLength(5);
    expect(logsState.logs[2].id).not.toEqual(logsState.logs[3].id);
    expect(logsState.logs[2].name).toBe('Log #3');
    expect(logsState.activeLogIdx).toBe(4);

    //  delete 1 log
    deleteLogs(1);
    expect(logsState.logs).toHaveLength(4);
    expect(logsState.activeLogIdx).toBe(3);

    // create 2 new logs => 6 logs
    createLogs(2);
    expect(logsState.logs[4].name).toBe('Log #5');
    expect(logsState.activeLogIdx).toBe(5);

    //  select log idx 3 and delete => 5 logs
    clonedLogs = [...logsState.logs];
    selectLog(3);
    deleteLogs(1);
    expect(logsState.logs).not.toContainEqual(clonedLogs[3]);
    expect(logsState.activeLogIdx).toBe(3);

    //   create 1 more => 6 logs
    createLogs(1);
    expect(logsState.logs[5].name).toBe('Log #6');
    expect(logsState.activeLogIdx).toBe(5);

    //   delete 3 log
    clonedLogs = [...logsState.logs];
    deleteLogs(3);
    expect(logsState.activeLogIdx).toBe(2);
    expect(logsState.logs).not.toContainEqual(clonedLogs[5]);
    expect(logsState.logs).not.toContainEqual(clonedLogs[4]);
    expect(logsState.logs).not.toContainEqual(clonedLogs[3]);

    // delete the rest
    deleteLogs(3);
    expect(logsState.logs).toHaveLength(0);
    expect(logsState.activeLogIdx).toBe(0);

    // try delete when logs empty => activeLogIdx still 0
    deleteLogs(2);
    expect(logsState.logs).toHaveLength(0);
    expect(logsState.activeLogIdx).toBe(0);

    //   create 3 new ones
    createLogs(3);
    expect(logsState.logs[0].name).toBe('Log #1');

    // select log 1 and delete 1 => 2 logs left
    selectLog(1);
    deleteLogs(1);
    expect(logsState.activeLogIdx).toBe(1);
  });

  it('should only select logs that exist', () => {
    //   create 3 new logs => 5 logs total
    createLogs(3);

    selectLog(3);
    expect(logsState.activeLogIdx).toBe(3);

    selectLog(5);
    expect(logsState.activeLogIdx).toBe(3);

    selectLog(15);
    expect(logsState.activeLogIdx).toBe(3);

    selectLog(4);
    expect(logsState.activeLogIdx).toBe(4);

    selectLog(-1);
    expect(logsState.activeLogIdx).toBe(4);
  });

  it('should correctly select and reset year, date and log day modal display', () => {
    // cant select year or date that dont exist
    selectYear(currentYear + 1);
    expect(logsState.selectedYear).toBe(currentYear);

    selectDate({ date: 30, month: 2, year: currentYear });
    expect(logsState.selectedDate).toBeNull();
    expect(logsState.showLogDayModal).toBeFalsy();

    selectDate({ date: 30, month: 1, year: currentYear + 1 });
    expect(logsState.selectedDate).toBeNull();
    expect(logsState.showLogDayModal).toBeFalsy();

    // create 5 new logs => 7 logs total
    createLogs(5);

    // for each log, add extra data for the past 4 years
    for (const log of logsState.logs) {
      for (let i = 1; i <= 4; i++) {
        log.data[currentYear - i] = initEmptyLog(currentYear - i);
      }
    }

    // 5 log years in total
    for (const log of logsState.logs) {
      expect(Object.keys(log.data)).toHaveLength(5);
    }

    // changing log => selected year and date will be reset, test this 4 times
    selectLog(0);
    for (let i = 1; i <= 4; i++) {
      selectYear(currentYear - i);
      selectDate({ date: 3, month: 5, year: currentYear - i });

      expect(logsState.activeLogIdx).toBe(i - 1);
      expect(logsState.selectedYear).toBe(currentYear - i);
      expect(logsState.selectedDate).toStrictEqual({ date: 3, month: 5, year: currentYear - i });
      expect(logsState.showLogDayModal).toBeTruthy();

      selectLog(i);

      // after selecting new log => things should be reset
      expect(logsState.selectedYear).toBe(currentYear);
      expect(logsState.selectedDate).toBeNull();
      expect(logsState.showLogDayModal).toBeFalsy();
    }
  });

  it('should edit log details correctly', () => {
    //   take mock log and change it up a bit
    const mockLog = { ...DEFAULT_LOGS[0] };
    mockLog.name = 'abc';
    mockLog.description = 'def';
    mockLog.data[currentYear][3][10] = 5;
    mockLog.keys[1].label = 'hot pink';

    //   edit log 0
    editLog(mockLog);
    expect(logsState.logs[0]).toEqual(mockLog);

    //   edit log 1
    selectLog(1);
    editLog(mockLog);
    expect(logsState.logs[1]).toEqual(mockLog);
  });

  it('should only log real dates with real key values', () => {
    selectLog(0);
    selectYear(currentYear);

    // real date and real key value
    selectDate({ date: 31, month: 1, year: currentYear });
    logDay(3);
    expect(logsState.logs[0].data[currentYear][1][31]).toBe(3);

    selectDate({ date: 30, month: 12, year: currentYear });
    logDay(4);
    expect(logsState.logs[0].data[currentYear][12][30]).toBe(4);

    //   false date
    selectDate({ date: 30, month: 2, year: currentYear });
    logDay(4);
    expect(logsState.logs[0].data[currentYear][2][30]).toBeNull();

    selectDate({ date: 30, month: 13, year: currentYear });
    logDay(4);
    expect(logsState.logs[0].data[currentYear][13]?.[30]).toBeFalsy();

    //   false key value
    selectDate({ date: 3, month: 3, year: currentYear });
    logDay(6);
    expect(logsState.logs[0].data[currentYear][3][3]).toBe(0);

    selectDate({ date: 30, month: 12, year: currentYear });
    logDay(7);
    //   we made this 4 above
    expect(logsState.logs[0].data[currentYear][12][30]).toBe(4);
  });

  it('should display and dismiss modals correctly', () => {
    displayEditModal();
    expect(logsState.showEditModal).toBeTruthy();
    expect(logsState.showLogDayModal).toBeFalsy();

    dismissModal();
    expect(logsState.showEditModal).toBeFalsy();
    expect(logsState.showLogDayModal).toBeFalsy();

    selectDate({ date: 3, month: 3, year: currentYear });
    expect(logsState.showEditModal).toBeFalsy();
    expect(logsState.showLogDayModal).toBeTruthy();

    selectLog(1);
    expect(logsState.showEditModal).toBeFalsy();
    expect(logsState.showLogDayModal).toBeFalsy();
  });
});
