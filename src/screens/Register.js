import React, { Component } from 'react'
import { View, AsyncStorage,StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, Label, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            hidePassword: false,
            borderColor: 'rgb(82, 148, 255)',
            email: '',
            password: ''
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
                <Content>
                    <View style={styles.formWrapper}>
                        <Text style={{ alignSelf: 'center', fontSize: 40 }}>Register</Text>
                        <Item floatingLabel style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                            <Label>Username</Label>
                            <Input ref={comp => this.textInput = comp} onFocus={() => this.focus()} />
                        </Item>
                        <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                            <Label>ALamat Email</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                            <Label>Kata Sandi</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last style={{ marginTop: 10, borderColor: this.state.borderColor }}>
                            <Label>Konfimasi Kata Sandi</Label>
                            <Input />
                        </Item>
                        <Button block rounded onPress={this.login} style={{ backgroundColor: 'rgb(120, 172, 255)', marginTop: 30 }}>
                            <Text>Register</Text>
                        </Button>

                        <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                            <Text>Sudah punya akun?</Text><Text onPress={() => this.props.navigation.navigate("Login")}>&nbsp;Login Disini</Text>
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