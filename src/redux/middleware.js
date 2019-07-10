
import { logger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middlewares = [];

const reactNavigation = createReactNavigationReduxMiddleware(
  state => state.nav,
  "root",
);


middlewares.push(logger)
middlewares.push(thunk)
middlewares.push(reactNavigation)
middlewares.push(promise)

export default middlewares;