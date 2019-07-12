import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigation from './../../navigations/RootNavigation';
import todos from './todos';
import auth from './auth'
import home from './home'

const router = createNavigationReducer(RootNavigation);

const appReducer = {
  router,
  todos,
  auth,
  home
}

export default appReducer
