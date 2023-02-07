import React from 'react';
import { Block } from './Block';
import './index.css';

function App() {
  return (
    <div className="App">
      <Block value={0} currency="RUB" onChangeCurrency={(cur) => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  );
}


export default App;