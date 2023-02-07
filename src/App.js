import React from 'react';
import { Block } from './Block';
import './index.css';

function App() {
  const[fromCurrency, setFromCurrency] = React.useState('UAH');
  const[toCurrency, setToCurrency] = React.useState('USD');
  const[fromPrice, setFromPrice] = React.useState(0);
  const[toPrice, setToPrice] = React.useState(1);

  //const[rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch((err) => {
      console.warn(err);
      alert(('Невдалось отримати дані'))
    });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = (price * ratesRef.current[toCurrency]);
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = ((ratesRef.current[fromCurrency]/ratesRef.current[toCurrency]) * value);
    setToPrice(value);
    setFromPrice(result.toFixed(3));
  }

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  },[toCurrency]);

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  },[fromCurrency]);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;