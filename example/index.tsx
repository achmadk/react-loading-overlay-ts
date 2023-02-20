import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import LoadingOverLay, { LoadingOverLayProps } from '../.';

const App = () => {
  const [active, setActive] = React.useState(true)
  const overlayRef = React.useRef<HTMLDivElement>(null as unknown as HTMLDivElement)

  const handleToggleActiveButton = React.useCallback(() =>
    setActive(prevVal => !prevVal)
  , [])

  return (
    <React.StrictMode>
      <>
        <LoadingOverLay
          ref={overlayRef}
          active={active}
          spinner={true}
          text="Loading..."
          styles={{
            wrapper: (base: any, props: LoadingOverLayProps) => {
              console.log(base, props)
              return {
                ...base,
                backgroundColor: 'red'
              }
            }
          }}>
          <div style={{ height: 100 }}>
            hello
          </div>
        </LoadingOverLay>
        <button onClick={handleToggleActiveButton}>Show/hide overlay</button>
      </>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
