import React,{ Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login.js';
import Person from './pages/person.js';
import WatchPage from './pages/watchPage.js';

const routeList = [
  {
    path: '/',
    component: Login
  },
  {
    path:'/person',
    component: Person
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
