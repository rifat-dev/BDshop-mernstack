import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';


import Login from './components/user/Login'
import Register from './components/user/Register'


import Footer from './components/layouts/Footer';


import AdminDashbord from './components/admin/Dashbord/AdminDashbord';
import HomePage from './pages/HomePage';

import ProtectedRoute from './components/route/ProtectedRoute';

function App() {
  return (
    <div className="App">

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
