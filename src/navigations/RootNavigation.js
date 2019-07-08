import {createStackNavigator, createAppContainer } from "react-navigation"

import List from '../screens/List'

const MainNavigator = createStackNavigator({
    List : {
        screen : List,
        navigationOptions : ({navigation}) => ({
            title : `MyTask`,
        })
    }
});

const RootNavigation = createAppContainer(MainNavigator);

export default RootNavigation
