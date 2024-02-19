import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
    const [number, setNumber] = useState('');
  const [exponent, setExponent] = useState('');
  const [operation, setOperation] = useState('factorial');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = () => {
      
      if (operation === 'power') {
          try {
          axios.get(`http://13.60.40.154:8085/calculator/${operation}`, {
          params: {
            number: number,
            exponent: exponent
          }
        }).then((response) => {
            if (response.status === 200) {
              setResult(response.data.result);
                setError(null);
            } else {
              console.error('No result found in response:', response);
            setResult(null);
            setError('Error: No result found in response');
            }
          }).catch(error => {
            console.error('Error fetching data:', error);
          setResult(null);
          setError('Error: Something went wrong. Please try again.');
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      } else {
          try {
          axios.get(`http://13.60.40.154:8085/calculator/${operation}/${number}`).then((response) => {
              console.log(response);
            if (response.status === 200) {
              setResult(response.data.result);
                setError(null);
            } else {
              console.error('No result found in response:', response);
            setResult(null);
            setError('Error: No result found in response');
            }
          }).catch(error => {
            console.error('Error fetching data:', error);
          setResult(null);
          setError('Error: Something went wrong. Please try again.');
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
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
