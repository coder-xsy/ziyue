import React,{ Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login.js';
import LessonPage from './pages/lessonPage.js';
import AnsQues from './pages/ansQues.js';
import Person from './pages/person.js';
import WatchPage from './pages/watchPage.js';
import SearchPage from "./pages/searchPage.js";

const routeList = [
  {
    path: '/',
    component: Login
  },
  {
    path:'/person/:accountType/:account/:type',
    component: Person
  },
  {
    path:'/lesson/:lessonId',
    component: LessonPage
  },
  {
    path:'/:accountType/:account/lesson/:lessonId',
    component: LessonPage
  },
  {
    path: '/:accountType/:account/watchPage/:lessonId/:chapterId',
    component: WatchPage
  },
  {
    path:'/:accountType/:account/ansQues/:quesId',
    component: AnsQues
  },
  {
    path:'/:accountType/:account/search',
    component: SearchPage
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
