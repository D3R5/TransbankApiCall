import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [responseMessage, setResponseMessage] = useState('');
  const [token, setToken] = useState('');

  const handleInitTransaction = async () => {
    try {
      const response = await axios.post('/api/init');
      setResponseMessage(JSON.stringify(response.data, null, 2));
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckStatus = async () => {
    try {
      const response = await axios.post('/api/getStatus', { token_ws: token });
      setResponseMessage(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefund = async () => {
    try {
      const response = await axios.post('/api/refund', { token_ws: token });
      setResponseMessage(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Transbank App</h1>
      <button onClick={handleInitTransaction}>Iniciar Transacción</button>
      {token && (
        <div>
          <button onClick={handleCheckStatus}>Ver Estado de Transacción</button>
          <button onClick={handleRefund}>Reembolso</button>
        </div>
      )}
      <div className="response-container">
        <h2>Respuesta del Servidor:</h2>
        <pre>{responseMessage}</pre>
      </div>
    </div>
  );
}

export default App;
