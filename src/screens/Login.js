import React, { Component } from 'react'
import { View, AsyncStorage, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'

const image = {
    logo: require('../../assets/picture/logo1.png')
}

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            hidePassword: true,
            borderColor: 'rgb(82, 148, 255)',
            email: '',
            password: ''
        }
    }

    eyePress = () => {
        this.setState(prev => ({ hidePassword: !prev.hidePassword }))
    }

    onChange = (text, type) => {
        type === 'email' ? this.setState({ email: text }) : this.setState({ password: text })
    }
    render() {
        
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