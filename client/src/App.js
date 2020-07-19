import React, { lazy, Suspense, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Index from './components/pages';
import Register from './components/pages/Register';
import Overlay from './components/layout/Overlay';
import AppState from './context/app/AppState';
import AuthContest from './context/auth/authContext';
import AlertState from './context/alert/AlertState';
import spinner from './images/spinner.gif';

import PrivateRoute from './components/routes/PrivateRoute';
import GuestRoute from './components/routes/GuestRoute';
import setTokenInHeader from './utils/setTokenInHeader';

const BudgetExpenses = lazy(() => import('./components/pages/BudgetExpenses'));

if (localStorage.token) {
  setTokenInHeader(localStorage.token);
}

const App = () => {
  const authContext = useContext(AuthContest);

  const { getUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      getUser();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <AppState>
      <AlertState>
        <Router>
          <Overlay />
          <Header />
          <main>
            <Suspense
              fallback={
                <div style={spinnerStyle}>
                  <img src={spinner} alt='spinner' />
                </div>
              }
            >
              <Switch>
                <Route exact path='/' component={Index} />
                <PrivateRoute
                  path='/budget&expenses'
                  component={BudgetExpenses}
                />
                <GuestRoute path='/login' component={Login} />
                <GuestRoute path='/register' component={Register} />
                <Route path='/about' component={About} />
              </Switch>
            </Suspense>
          </main>
        </Router>
      </AlertState>
    </AppState>
  );
};

const spinnerStyle = {
  width: '80px',
  height: '80px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export default App;
