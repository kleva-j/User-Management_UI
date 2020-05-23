import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { App } from './App';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/users" component={App} />
        <Redirect to="/users" />
      </Switch>
    </BrowserRouter>
  );
}
