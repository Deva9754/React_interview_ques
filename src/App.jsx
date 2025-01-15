import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import Layout from './components/Layout';  
import { Provider } from 'react-redux';
import store from '../src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Wrap pages with Layout component to include the header and home button */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
