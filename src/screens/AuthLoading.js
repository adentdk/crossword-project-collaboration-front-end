import React, { Component } from 'react'
import { ActivityIndicator, View, AsyncStorage, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'


class AuthLoading extends Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
        AsyncStorage.getItem('token',(error, result) => {
            console.log(result)
            if(result == null){
                return this.props.navigation.navigate('Auth')
            }
            
            return  this.props.navigation.navigate('App')

        });
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#4167b2" />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default withNavigation(AuthLoading);