import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet,Alert } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'

import {connect}  from 'react-redux'

import  * as actionAuth  from '../redux/actions/auth'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            hidePassword: true,
            email: '',
            password: '',
            result : {},
            isLoading : false
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

    login = () => {
        
            this.props.login({email : this.state.email, password : this.state.password})

            if(this.props.auth.isLoading){
              console.log("loading iya");
            }else{
                if(this.props.auth.isError){
                    Alert.alert('Login failed',this.props.auth.errorMessage)
                }else{
                    AsyncStorage.setItem('token',this.props.auth.data.access_token)
                }
            }
        

    }

    render() {
        
        return (
            <Container>
                <Content>
                    <View style={styles.formWrapper}>
                        <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: "300", marginBottom: 20 }}>Login</Text>
                        </View>
                        <Item rounded style={styles.inputWrapper}>
                            <Input onChangeText={text => this.onChange(text, 'email')}
                                keyboardType={"email-address"}
                                placeholder='Alamat Email'
                                />
                        </Item>
                        <Item rounded style={styles.inputWrapper}>
                            <Input placeholder='Kata Sandi'
                                secureTextEntry={this.state.hidePassword ? true : false}
                                onChangeText={text => this.onChange(text, 'password')}
                                />
                            {!this.state.hidePassword ?
                                <Entypo name='eye' size={30} onPress={() => this.eyePress()} style={{ position: 'absolute', right: 10 }} />
                                :
                                <Entypo style={{ position: 'absolute', right: 10 }} onPress={() => this.eyePress()} name='eye-with-line' size={30} />
                            }
                        </Item>
                        <Button block rounded 
                                onPress={this.login} 
                                style={{ backgroundColor: 'rgb(120, 172, 255)', 
                                marginTop: 10 }}>
                            <Text>Masuk</Text>
                        </Button>
                        <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                            <Text>Belum punya akun?</Text><Text onPress={() => this.register()}>&nbsp; DaFtar Sekarang!!</Text>
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
        login : (data) => dispatch(actionAuth.Login(data)) 
    }
}

const LoginScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginScreen


const styles = StyleSheet.create({
    formWrapper: { marginTop: 60, flex: 1, width: '100%', padding: 10 },
    inputWrapper: { borderColor: 'rgb(82, 148, 255)', marginBottom: 10}
})