import React,{ Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home.js';
import WatchPage from './pages/watchPage.js';

const routeList = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/watchPage/:id',
    component: WatchPage
  }
];

class DRouter extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {
            routeList.map(item => (
              <Route
                key={item.path}
                exact
                path={item.path}
                component={item.component}
              />
            )
            )
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default DRouter;
