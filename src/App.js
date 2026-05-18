import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { initializeAuth } from './store/slices/authSlice';
import AppRouter from './router';

import './i18n';
import './index.css';

const AppInitializer = () => {
  const dispatch = useDispatch();
  const { appLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
    
    // Apply global theme on initial load
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch]);

  if (appLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AppRouter />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer />
      </Router>
    </Provider>
  );
}

export default App;
