import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SecureRoute } from './components/SecureRoute/SecureRoute';

import { LoginPage } from './pages/LoginPage/LoginPage';
import { HomePage } from './pages/HomePage/HomePage';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <SecureRoute path={'/'}>
          <HomePage />
        </SecureRoute>
      </Switch>
    </Router>
  );
}

export default App;
