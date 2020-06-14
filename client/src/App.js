import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ToggleBtnMenu from './components/layout/ToggleBtnMenu';
import Overlay from './components/layout/Overlay';
import Alert from './components/layout/Alert';
import AppState from './context/app/AppState';
import AlertState from './context/alert/AlertState';

const App = props => {
  return (
    <AppState>
      <AlertState>
        <Router>
          <Overlay />
          <Header />
          <main>
            <Alert />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <ToggleBtnMenu />
                    <Home />
                  </Fragment>
                )}
              />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/about' component={About} />
            </Switch>
          </main>
        </Router>
      </AlertState>
    </AppState>
  );
};

export default App;
