import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
    const [number, setNumber] = useState('');
  const [exponent, setExponent] = useState('');
  const [operation, setOperation] = useState('factorial');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    try {
      let response;
      if (operation === 'power') {
        response = await axios.get(`http://13.60.40.154:8083/calculator/${operation}`, {
          params: {
            number: number,
            exponent: exponent
          }
        });
      } else {
        response = await axios.get(`http://13.60.40.154:8083/calculator/${operation}/${number}`);
      }
      setResult(response.data.result);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
      setError('Error: Something went wrong. Please try again.');
    }
  };

  return (
    <div className="calculator">
      <p>MT2023103 - Subhodip Rudra</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter number"
      />
      {operation === 'power' && (
        <input
          type="number"
          value={exponent}
          onChange={(e) => setExponent(e.target.value)}
          placeholder="Enter exponent"
        />
      )}
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="factorial">Factorial</option>
        <option value="log">Logarithm</option>
        <option value="sqrt">Square Root</option>
        <option value="power">Power</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {error && <p className="error">{error}</p>}
      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  );
};

export default Home;
