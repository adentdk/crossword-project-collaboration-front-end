import React, { Component } from 'react'
import { Provider,connect } from 'react-redux'

import { createReduxContainer } from 'react-navigation-redux-helpers'

import RootNavigation from './src/navigations/RootNavigation'

import { store } from './src/redux/store'


import { YellowBox } from 'react-native'

const AppNav = createReduxContainer(RootNavigation, 'root')


const mapStateToProps = state => ({
    state : state.router
})

const AppWithNavigationState = connect(mapStateToProps)(AppNav)

class App extends Component {

  render(){
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);  // <- insert the warning text here you wish to hide.
    return (  
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default App