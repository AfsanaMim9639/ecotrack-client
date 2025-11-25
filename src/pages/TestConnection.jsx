import { useState, useEffect } from 'react';
import api from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test health endpoint
      const response = await api.get('/health');
      setStatus('✅ Connected Successfully!');
      setData(response);
      setError(null);
    } catch (err) {
      setStatus('❌ Connection Failed');
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Connection Test</h1>
      
      <div style={{ marginTop: '20px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Status: {status}</h2>
        
        {data && (
          <div style={{ marginTop: '15px' }}>
            <h3>✅ Response Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        
        {error && (
          <div style={{ marginTop: '15px', color: 'red' }}>
            <h3>❌ Error:</h3>
            <p>{error}</p>
          </div>
        )}
        
        <button 
          onClick={testConnection}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Again
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Configuration:</h3>
        <ul>
          <li><strong>Client URL:</strong> https://ecotrack-71dcf.web.app</li>
          <li><strong>Server URL:</strong> https://ecotrack-server-three.vercel.app</li>
          <li><strong>API Base:</strong> {import.meta.env.VITE_API_BASE_URL}</li>
        </ul>
      </div>
    </div>
  );
};

export default TestConnection;