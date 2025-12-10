import React, { useState, useEffect } from 'react';
import { Landing } from './components/Landing';
import { Generator } from './components/Generator';
import { Login } from './components/Login';
import { Register } from './components/Register';

type ViewState = 'landing' | 'login' | 'register' | 'generator';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    setIsChecking(true);
    try {
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasKey(has);
        if (has) {
          setCurrentView('generator');
        }
      }
    } catch (e) {
      console.error("Failed to check API key status", e);
    } finally {
      setIsChecking(false);
    }
  };

  const handleAuthSuccess = async () => {
    // After login/register UI flow, we trigger the API key selection which is the real "auth" for this app
    if (hasKey) {
      setCurrentView('generator');
      return; 
    }

    try {
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
        setHasKey(true);
        setCurrentView('generator');
      } else {
        alert("AI Studio environment not detected. Please run this in the Project IDX or appropriate environment.");
      }
    } catch (e) {
      console.error("Error selecting key", e);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse font-mono text-sm">Initializing System...</div>
      </div>
    );
  }

  // If the user already has a key (was logged in/selected previously), show Generator immediately
  // unless they explicitly want to log out (not implemented).
  if (hasKey && currentView === 'landing') {
    // This is a safety catch, though useEffect should handle it.
    return <Generator />;
  }

  switch (currentView) {
    case 'login':
      return (
        <Login 
          onLogin={handleAuthSuccess} 
          onNavigateRegister={() => setCurrentView('register')}
          onBack={() => setCurrentView('landing')}
        />
      );
    case 'register':
      return (
        <Register 
          onRegister={handleAuthSuccess} 
          onNavigateLogin={() => setCurrentView('login')}
          onBack={() => setCurrentView('landing')}
        />
      );
    case 'generator':
      return <Generator />;
    default:
      return (
        <Landing 
          onLogin={() => setCurrentView('login')} 
          onRegister={() => setCurrentView('register')} 
        />
      );
  }
};

export default App;