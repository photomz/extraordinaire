import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ResultPage from './containers/ResultPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.RESULT} component={ResultPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
