import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>

      <button onClick={() => setCount(0)}>
        reset
      </button>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default App;
