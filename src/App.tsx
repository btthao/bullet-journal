import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorage';
import useLogsData, { LogData } from './hooks/useLogsData';

function App() {
  const [localStorage, setLocalStorage] = useLocalStorage<LogData[]>('logs', []);
  const { state, createNewLog } = useLogsData(localStorage);

  useEffect(() => {
    setLocalStorage(state);
  }, [state]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='flex h-screen'>
        <Sidebar data={state} />
        <Main data={state[0]} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
