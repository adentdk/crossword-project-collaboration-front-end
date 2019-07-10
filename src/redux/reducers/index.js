import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigation from './../../navigations/RootNavigation';
import boards from './boards'

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  boards,
})

export default appReducer
