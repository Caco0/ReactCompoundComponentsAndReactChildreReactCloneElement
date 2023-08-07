//Compound Components
import { createContext, useContext, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const s = {
  style: {
    fontSize: '50px',
  },
};

const TurnOnOffContext = createContext();

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return (
    <TurnOnOffContext.Provider value={{ isOn, onTurn }}>
      {children}
    </TurnOnOffContext.Provider>
  );
};
const P = ({ children }) => <p {...s}>{children}</p>;

const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};
const TurnedOff = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};

const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  return (
    <button onClick={onTurn} {...props} className="onOff">
      Turn {isOn ? 'OFF' : 'ON'}
    </button>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React - Project Compound Components</h1>
      <h3>React.Children + React.CloneElement</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}p
        </button>
        <div>
          <TurnOnOff>
            <div>
              <p {...s}>oi</p>
              <TurnedOn>
                <P>Aqui as coisas que vão acontecer quando estiver ON.</P>
              </TurnedOn>
              <TurnedOff>
                <P> Aqui as coisas do OFF.</P>
              </TurnedOff>
              <TurnButton {...s} />
            </div>
          </TurnOnOff>
        </div>
      </div>
    </>
  );
}

export default App;
