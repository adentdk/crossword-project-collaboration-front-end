import React, { Component } from 'react'
import {View,AsyncStorage} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'//eye/eye-off
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Item,Input } from 'native-base'

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            hidePassword:false,
            borderColor:'rgb(82, 148, 255)',
            email:'',
            password:''
        }
    }

    eyePress=()=> {
		this.setState(prev => ({hidePassword:!prev.hidePassword}))
    }

    onChange=(text,type)=> {
		type === 'email' ? this.setState({email:text}) : this.setState({password:text})
	}
    render() {
        return (
            <Container>
                <Content>
                    <View style={{marginTop:60,flex:1,width:'100%',padding:10}}>
                        <View style={{width:'100%',flex:1,alignItems:'center'}}>
                            <Text style={{fontSize:40,fontWeight:"300",marginBottom:20}}>Login</Text>
                        </View>
                        <Item rounded style={{borderColor:this.state.borderColor}}>
                            <Input onChangeText={text => this.onChange(text,'email')} placeholder='email' />
                        </Item>
                        <Item rounded style={{borderColor:this.state.borderColor,marginTop:10}}>
                            <Input placeholder='pw' secureTextEntry={this.state.hidePassword ? true : false} onChangeText={text => this.onChange(text,'pw')} />
                            { !this.state.hidePassword ? 
                                <Entypo name='eye' size={30} onPress={() => this.eyePress()} style={{position:'absolute',right:10}}/>
                                : 
                                <Entypo style={{position:'absolute',right:10}} onPress={() => this.eyePress()} name='eye-with-line' size={30}/> 
                            }
                        </Item>
                        <Button block rounded onPress={this.login} style={{backgroundColor:'rgb(120, 172, 255)',marginTop:30}}>
                            <Text>Login</Text>
                        </Button>
                        <View style={{alignSelf:'center',marginTop:10,flexDirection:'row'}}>
                            <Text>Belum punya akun?</Text><Text onPress={() => this.register()}>&nbsp; DaFtar Sekarang!!</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
