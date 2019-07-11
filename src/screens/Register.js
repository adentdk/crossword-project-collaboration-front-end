import React, { Component } from 'react'
import { View, AsyncStorage,StyleSheet,TouchableHighlight } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, Label, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'

export default class Register extends Component {
    constructor() {
        super()
        this.state={
            hidePassword:true,
            borderColor:'white',
            email:'',
            password:''
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


    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#FFB873'}} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{marginTop:10,flex:1,width:'100%',padding:10}}>
                        <View style={{ marginTop: 10, flex: 1, width: '100%', padding: 10 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 40, fontFamily: "Roboto" }}>Register</Text>
                            <Item floatingLabel style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label style={{paddingLeft: 15}}>Username</Label>
                                <Input ref={comp => this.textInput = comp} onFocus={() => this.focus()} />
                            </Item>
                            <Item floatingLabel last style={{marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Email</Label>
                                <Input onChangeText={(text) => {
                                    this.setState({
                                        
                                    })
                                }} />
                            </Item>
                            <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Password</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                                <Label>Confirm Password</Label>
                                <Input />
                            </Item>
                            <Button block rounded onPress={this.login} style={{ backgroundColor: '#00142B', marginTop: 30 }}>
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


const styles = StyleSheet.create({
    formWrapper : { marginTop: 40, flex: 1, width: '100%', padding: 10 },

})