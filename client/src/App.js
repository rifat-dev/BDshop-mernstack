import { useEffect, useState, createRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';


import Login from './components/user/Login'
import Register from './components/user/Register'
import BottomButton from './components/layouts/Button/BottomButton';
import AdminDashbord from './components/admin/Dashbord/AdminDashbord';
import HomePage from './pages/HomePage';

import ProtectedRoute from './components/route/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <BottomButton />
      <Router>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/admin/:id' component={AdminDashbord} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
