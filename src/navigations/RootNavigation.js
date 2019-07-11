import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"


import AuthLoading from '../screens/AuthLoading.js'
import Board from '../screens/Board'
import Login from '../screens/Login'
import Logout from '../screens/Logout'
import Register from '../screens/Register'


const Authenticated = createStackNavigator({
    Board: {
        screen: Board,
        navigationOptions: ({ navigation }) => ({
            title: `Soal 1`,
        })
    },
    Logout : {
        screen : Logout
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

        initialRouteName: 'AuthLoading',
        resetOnBlur: true,
    }
));

export default RootNavigation
