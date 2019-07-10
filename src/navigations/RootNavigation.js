import {createStackNavigator, createAppContainer } from "react-navigation"

import Board from '../screens/Board'
import Login from '../screens/Login'

const MainNavigator = createStackNavigator({
    Board : {
        screen : Board,
        navigationOptions : ({navigation}) => ({
            title : `Soal 1`
        })
    }
});

const RootNavigation = createAppContainer(MainNavigator)

export default RootNavigation
