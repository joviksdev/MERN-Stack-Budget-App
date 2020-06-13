import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AppState from './context/app/AppState';
import ToggleBtnMenu from './components/layout/ToggleBtnMenu';
import Overlay from './components/layout/Overlay';

const App = props => {
  return (
    <AppState>
      <Router>
        <Overlay />
        <Header />
        <main>
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
    </AppState>
  );
};

export default App;
