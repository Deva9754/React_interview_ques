import React from 'react';
import './index.css';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import Quiz from './components/pagination/Quiz';
import Pagination from './components/pagination/Pagination';
import LoginYup from './components/LoginYup';
import Tabs from './components/tabs/Tabs';
import AutoCompletion from './components/tabs/AutoCompletion';
import PostList from './components/graph/PostList';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path ="/pagination" element={<Pagination/>}/>
          <Route path="/loginyup" element={<LoginYup/>}/>
          <Route path='/tabs' element={<Tabs/>}/>
          <Route path='/auto-completion' element={<AutoCompletion/>}/>

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
