import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, Label, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'

import {connect} from 'react-redux'
import * as actionAuth from '../redux/actions/auth'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            hidePassword: true,
            borderColor: 'white',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            isLoading : false,
        }
        this.textInput = null
    }

    eyePress = () => {
        this.setState(prev => ({ hidePassword: !prev.hidePassword }))
    }

    focus = () => {

    }

    onChange = (text, type) => {
        type === 'email' ? this.setState({ email: text }) : this.setState({ password: text })
    }

    register = async() => {

        this.props.register({
            username : this.state.username,
            email : this.state.email,
            password : this.state.password,
            confirm_password : this.state.confirm_password
        })
        
        this.setState({
            isLoading : this.props.auth.isLoading,
            isError : this.props.auth.isError
        })

        if(this.state.isError && this.state.isLoading == false) {
            Alert.alert("Register Gagal",this.props.auth.errorMessage)
        }else{
            Alert.alert('Register Berhasil','silahkan login')
            this.props.navigation.navigate('Login')
        }
        
    }


    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#FFB873' }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginTop: 10, flex: 1, width: '100%', padding: 10 }}>
                        <View style={{ marginTop: 10, flex: 1, width: '100%', padding: 10 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 40, fontFamily: "Roboto" }}>Register</Text>
                            <Item floatingLabel style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label style={{ paddingLeft: 15 }}>Username</Label>
                                <Input ref={comp => this.textInput = comp} onFocus={() => this.focus()}
                                    value={this.state.username}
                                    onChangeText={(text) => {
                                        this.setState({
                                            username: text
                                        })
                                    }}
                                />
                            </Item>
                            <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Email</Label>
                                <Input
                                    value={this.state.email}
                                    onChangeText={(text) => {
                                        this.setState({
                                            email: text
                                        })
                                    }} />
                            </Item>
                            <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Password</Label>
                                <Input
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        })
                                    }} />
                            </Item>
                            <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Confirm Password</Label>
                                <Input value={this.state.confirm_password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            confirm_password: text
                                        })
                                    }} />
                            </Item>
                            <Button block rounded onPress={this.register} style={{ backgroundColor: '#00142B', marginTop: 30 }}>
                                <Text>Register</Text>
                            </Button>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: 5, flexDirection: 'row' }}>
                            <Text style={{ color: '#00142B' }}>Sudah punya akun ?</Text><Text style={{ color: '#00142B', fontWeight: '500' }} onPress={() => this.props.navigation.navigate('Login')}>&nbsp; Login !</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}



const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (data) => dispatch(actionAuth.register(data))
    }
}

const RegisterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default RegisterScreen