import React, { useEffect, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Overlay from './components/layout/Overlay';
import AppState from './context/app/AppState';
import AlertState from './context/alert/AlertState';
import spinner from './images/spinner.gif';

import PrivateRoute from './components/routes/PrivateRoute';
import setTokenInHeader from './utils/setTokenInHeader';
import AuthContext from './context/auth/authContext';

const Home = lazy(() => import('./components/pages'));

if (localStorage.token) {
  setTokenInHeader(localStorage.token);
}

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.token) {
      authContext.getUser();
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
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/about' component={About} />
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
