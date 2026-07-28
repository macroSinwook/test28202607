import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

type Profile = {
  id: number;
  name: string;
  email: string;
};

type Item = {
  id: number;
  label: string;
  applied: boolean;
};

type PageContentProps = {
  title: string;
  content: string;
};

function PageContent({ title, content }: PageContentProps) {
  return (
    <div className="App-page-content-block">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<Item[]>([
    { id: 1, label: 'Item A', applied: false },
    { id: 2, label: 'Item B', applied: false },
    { id: 3, label: 'Item C', applied: false },
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:5000/api/profile');
      const data = await response.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextName = name.trim() || 'friend';
    setSubmittedName(nextName);
    setIsSubmitted(true);
    setName('');
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const applyBatch = () => {
    setItems((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, applied: true } : item))
    );
    setSelectedIds([]);
  };

  const pages = [
    { path: '/overview', title: 'Overview', content: 'This is the first page. It is now connected to a real URL.' },
    { path: '/details', title: 'Details', content: 'This is the second page with more details about the current view.' },
    { path: '/settings', title: 'Settings', content: 'This is the third page for extra controls and preferences.' },
  ];

  const goToPrevious = () => {
    const currentIndex = pages.findIndex((page) => location.pathname === page.path);
    const previousIndex = currentIndex <= 0 ? pages.length - 1 : currentIndex - 1;
    navigate(pages[previousIndex].path);
  };

  const goToNext = () => {
    const currentIndex = pages.findIndex((page) => location.pathname === page.path);
    const nextIndex = currentIndex === -1 || currentIndex === pages.length - 1 ? 0 : currentIndex + 1;
    navigate(pages[nextIndex].path);
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
        {profile && (
          <div className="App-profile">
            <h2>Profile</h2>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
          </div>
        )}

        <section className="App-batch-section">
          <h2>Batch Apply</h2>
          <p>Select items and apply the same action to all selected ones.</p>
          <div className="App-batch-list">
            {items.map((item) => (
              <label key={item.id} className="App-batch-item">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
                <span>{item.label}</span>
                {item.applied && <span className="App-badge">Applied</span>}
              </label>
            ))}
          </div>
          <div className="App-actions">
            <button className="App-button" onClick={applyBatch}>
              Apply to Selected
            </button>
          </div>
          <p className="App-selected-count">Selected: {selectedIds.length}</p>
        </section>

        <section className="App-page-section">
          <div className="App-page-nav">
            <button className="App-close-button" onClick={goToPrevious}>
              ← Previous
            </button>
            <div className="App-page-links">
              {pages.map((page) => (
                <Link key={page.path} to={page.path} className="App-page-link">
                  {page.title}
                </Link>
              ))}
            </div>
            <button className="App-close-button" onClick={goToNext}>
              Next →
            </button>
          </div>
          <Routes>
            <Route path="/overview" element={<PageContent title="Overview" content="This is the first page. It is now connected to a real URL." />} />
            <Route path="/details" element={<PageContent title="Details" content="This is the second page with more details about the current view." />} />
            <Route path="/settings" element={<PageContent title="Settings" content="This is the third page for extra controls and preferences." />} />
            <Route path="*" element={<PageContent title="Overview" content="This is the first page. It is now connected to a real URL." />} />
          </Routes>
        </section>
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
