import React from 'react';
import './App.css';
import AppFrame from './components/AppFrame'; // Adjust this based on your file path
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <AppFrame />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

