import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"


import AuthLoading from '../screens/AuthLoading.js'
import Board from '../screens/Board'
import Login from '../screens/Login'
import Register from '../screens/Register'


const Authenticated = createStackNavigator({
    Board: {
        screen: Board,
        navigationOptions: ({ navigation }) => ({
            title: `Soal 1`,
        })
    }
});

const UnAuthenticated = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        },
        Register: {
            screen: Register,
            navigationOptions: ({ navigation }) => ({
                header: null
            })
        }
    }, {
        initialRouteName: 'Login'
    }
)

const RootNavigation = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: UnAuthenticated,
        App: Authenticated
    },
    {

        initialRouteName: 'App',
        resetOnBlur: true,
    }
));

export default RootNavigation
