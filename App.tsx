import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { Generator } from './components/Generator';
import { Login } from './components/Login';
import { Register } from './components/Register';

type ViewState = 'landing' | 'login' | 'register' | 'generator';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const handleAuthSuccess = () => {
    // In a static demo, we just navigate to the generator
    // without checking for real API keys.
    setCurrentView('generator');
  };

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