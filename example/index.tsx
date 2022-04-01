import 'react-app-polyfill/ie11';
import * as React from 'react';
import { render } from 'react-dom';
import LoadingOverLay, { LoadingOverLayProps } from '../.';

const App = () => {
  const overlayRef = React.useRef<HTMLDivElement>(null as unknown as HTMLDivElement)

  return (
    <React.StrictMode>
      <LoadingOverLay
        ref={overlayRef}
        active={true}
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
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
