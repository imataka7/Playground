import React, { useState, useEffect, useContext } from 'react';
// import logo from './logo.svg';
import './App.css';

const NameContext = React.createContext('imataka7');

// const a = () => console.log('Everyday is still day one.');
// const changeTitle = () => {
//   document.title = `Updated ${++cnt} times.`;
// };
// let cnt = 0;
// let counter: number;
// let f: any;

const PrintName = () => {
  const name = useContext(NameContext);

  return <p>{name}</p>;
};

const PrintName2 = () => (
  <NameContext.Consumer>
    {name => <p>{name}</p>}
  </NameContext.Consumer>
);

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  // f = setCount;

  // console.log('ohayou');
  // useEffect(() => a());
  // useEffect(() => console.log('goodnight'));

  // changeTitle();
  // useEffect(changeTitle);
  // useEffect(() => changeTitle());
  useEffect(() => {
    // document.title = `Updated ${++cnt} times.`;
    document.title = `Updated ${count} times.`;
    // console.log(cnt, count);
    // setCount(cnt);
    // Object.defineProperty(window, 'setCount', { value: setCount });
    // f = setCount;
  });

  // if (counter === null) {
  //   // Object.defineProperty(window, 'setCount', { value: setCount });

  //   counter = window.setInterval(() => {
  //     // setCount(count + 1);
  //     f?.(count + 1);
  //     // setCount(cnt);
  //     // cnt++;
  //     // console.log('set ', cnt, count, setCount);
  //     console.log(count, f);
  //   }, 1000);
  // }

  return (
    <NameContext.Provider value="Takaya Imagawa">
      <div className="App">
        <p>You clicked {count} times.</p>
        {/* <p>{cnt}</p> */}
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

        <PrintName></PrintName>
        <PrintName2></PrintName2>
      </div>
    </NameContext.Provider>
  );
};

export default App;
