import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorage';
import useLogsState, { LogsState } from './hooks/useLogsState';

function App() {
  const [localStorage, setLocalStorage] = useLocalStorage<LogsState>('logs', {} as LogsState);
  const { state, createNewLog, selectLog } = useLogsState(localStorage);

  useEffect(() => {
    setLocalStorage(state);
  }, [setLocalStorage, state]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='flex h-screen'>
        <Main data={state.logs[state.activeLogIdx]} />
        <Sidebar data={state.logs} selectLog={selectLog} activeLog={state.activeLogIdx} createNewLog={createNewLog} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
