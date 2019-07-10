import React, { Component } from 'react'
import {View,AsyncStorage} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer,Label, FooterTab, Button, Left, Right, Body, Icon, Text,Item,Input } from 'native-base'

export default class Register extends Component {
    constructor(){
        super()
        this.state={
            hidePassword:false,
            borderColor:'rgb(82, 148, 255)',
            email:'',
            password:''
        }
        this.textInput=null
    }

    eyePress=()=> {
		this.setState(prev => ({hidePassword:!prev.hidePassword}))
    }

    focus=()=> {
        console.log('asad')
    }

    onChange=(text,type)=> {
		type === 'email' ? this.setState({email:text}) : this.setState({password:text})
    }
    

    render() {
        return (
            <Container>
                <Content>
                    <View style={{marginTop:40,flex:1,width:'100%',padding:10}}>
                        <Text style={{alignSelf:'center',fontSize:40}}>Register</Text>
                        <Item floatingLabel style={{marginTop:10,borderColor:this.state.borderColor}}>
                            <Label>Username</Label>
                            <Input ref={comp => this.textInput=comp} onFocus={()=> this.focus()} />
                        </Item>
                        <Item floatingLabel last style={{marginTop:10,borderColor:this.state.borderColor}}>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last style={{marginTop:10,borderColor:this.state.borderColor}}>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last style={{marginTop:10,borderColor:this.state.borderColor}}>
                            <Label>Confirm Password</Label>
                            <Input />
                        </Item>
                        <Button block rounded onPress={this.login} style={{backgroundColor:'rgb(120, 172, 255)',marginTop:30}}>
                            <Text>Register</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}
