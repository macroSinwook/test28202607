import React, { useState } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = name.trim() || 'friend';
    setSubmittedName(nextName);
    setIsSubmitted(true);
    setName('');
  };

  return (
    <div className="App">
      <main className="App-main">
        <h1>React Popup Example</h1>
        <p>Click the button below to open a form popup.</p>
        <button className="App-button" onClick={() => setIsOpen(true)}>
          Open Popup
        </button>
        {submittedName && (
          <p className="App-message">Thanks, {submittedName}! Your form was submitted.</p>
        )}
      </main>

      {isOpen && (
        <div className="App-overlay" role="presentation" onClick={() => setIsOpen(false)}>
          <div className="App-popup" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            {isSubmitted ? (
              <>
                <h2>Completed</h2>
                <p className="App-success">Thanks, {submittedName}! Your form has been completed.</p>
                <button type="button" className="App-button" onClick={() => setIsOpen(false)}>
                  Close
                </button>
              </>
            ) : (
              <>
                <h2>Tell us your name</h2>
                <form onSubmit={handleSubmit} className="App-form">
                  <label htmlFor="name-input" className="App-label">
                    Name
                  </label>
                  <input
                    id="name-input"
                    className="App-input"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                  />
                  <div className="App-actions">
                    <button type="submit" className="App-button">
                      Submit
                    </button>
                    <button type="button" className="App-close-button" onClick={() => setIsOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
