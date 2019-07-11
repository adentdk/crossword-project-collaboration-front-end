import React, { Component } from 'react'
import { View, AsyncStorage, Image, StyleSheet, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off

import {connect} from 'react-redux'

import * as actionAuth from '../redux/actions/auth'

const image = {
    logo: require('../../assets/picture/logo1.png')
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            hidePassword: true,
            email: '',
            password: '',
            isLoading :  false,
        }
    }

    eyePress = () => {
        this.setState(prev => ({ hidePassword: !prev.hidePassword }))
    }

    onChange = (text, type) => {
        type === 'email' ? this.setState({ email: text }) : this.setState({ password: text })
    }

    register = () => {
        this.props.navigation.navigate('Register')
    }

    cekLogin = () => {
        if(this.props.auth.isError) {
            Alert.alert('Login failed',this.props.auth.errorMessage)
        }

        if(this.props.auth.isSuccess) {
            AsyncStorage.setItem('token',this.props.auth.data.access_token.token)
            this.props.navigation.navigate('App')
        }
    }

    login = () => {
        this.props.login({email : this.state.email, password : this.state.password})
    }

    render() { 
        this.cekLogin()
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, height: '100%' }}>
                        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>
                            <View style={{ flex: 1, marginBottom: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Image style={{ width: 190, height: 150, alignSelf: 'stretch', }} source={image.logo} />
                            </View>
                            <View style={{ backgroundColor: '#FFB873', flex: 0.7}}/>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#FFB873', padding: 25  }}>
                            <Item rounded style={{ backgroundColor: 'white', paddingLeft: 10 }}>
                                <Input onChangeText={text => this.onChange(text, 'email')} placeholder='email' />
                            </Item>
                            <Item rounded style={{ backgroundColor: 'white', marginTop: 10, paddingLeft: 10 }}>
                                <Input placeholder='password' secureTextEntry={this.state.hidePassword ? true : false} onChangeText={text => this.onChange(text, 'pw')} />
                                {!this.state.hidePassword ?
                                    <Entypo name='eye' size={23} onPress={() => this.eyePress()} style={{ position: 'absolute', right: 10, color: '#00142B'  }} />
                                    :
                                    <Entypo name='eye-with-line' size={23} style={{ position: 'absolute', right: 10, color: '#00142B' }} onPress={() => this.eyePress()}/>
                                }
                            </Item>
                            <Button block rounded onPress={this.login} style={{ backgroundColor: '#00142B', marginTop: 10 }}>
                                <Text>Login</Text>
                            </Button>
                            <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ color: '#00142B' }}>Belum punya akun ?</Text><Text style={{ color: '#00142B', fontWeight: '500' }} onPress={() => this.register()}>&nbsp; Daftar Sekarang !</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return  {
        auth : state.auth
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        login : (data) => dispatch(actionAuth.login(data)) 
    }
}

const LoginScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginScreen