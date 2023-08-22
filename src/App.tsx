import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorage';
import useLogsState, { LogsState } from './hooks/useLogsState';
import Error from './components/Error';

function App() {
  const [localStorage, setLocalStorage] = useLocalStorage<LogsState>('logs', {} as LogsState);
  const logsStateAndMethods = useLogsState(localStorage);

  useEffect(() => {
    setLocalStorage(logsStateAndMethods.state);
  }, [setLocalStorage, logsStateAndMethods.state]);

  return (
    <ErrorBoundary fallback={<Error />}>
      <div className='flex h-screen'>
        <Main {...logsStateAndMethods} />
        <Sidebar {...logsStateAndMethods} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
