import React from 'react';
import MainPage from './pages/MainPage';
import EditPage from './pages/EditPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={MainPage} />
      <Route path="/:taskId" component={EditPage} />
    </Router>
  );
};

export default App;
