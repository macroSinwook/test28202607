import React, { useState } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <main className="App-main">
        <h1>React Popup Example</h1>
        <p>Click the button below to open a simple popup.</p>
        <button className="App-button" onClick={() => setIsOpen(true)}>
          Open Popup
        </button>
      </main>

      {isOpen && (
        <div className="App-overlay" role="presentation" onClick={() => setIsOpen(false)}>
          <div className="App-popup" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h2>Welcome to my popup</h2>
            <p>This is a simple modal popup built with React.</p>
            <button className="App-close-button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
