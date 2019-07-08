import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Keyboard,
    Alert
} from 'react-native';

import * as actionTodos from './../redux/actions/todos'

import { ListItem,Input, Icon } from 'react-native-elements';


import { connect } from 'react-redux';

class List extends Component {

    constructor() {
        super()
        this.state = {
            inputTodoValue : '',
            id : ''
        }
    }

    handleButtonAddTodo = () => {
        this.props.addTodo({
            id : Math.floor(Math.random() * 10),
            name : this.state.inputTodoValue
        })

        this.setState({
            inputTodoValue : ""
        })
        Keyboard.dismiss()
    }
    
    handleButtonEdit = () => {
        this.props.editTodo({
            id : this.state.id,
            name : this.state.inputTodoValue
        })

        this.setState({
            inputTodoValue : ""
        })
        Keyboard.dismiss
    }

    handleEdit = (item) => () => {
        this.setState({ inputTodoValue : item.name, id : item.id})
    }

    handleRemove = (id) => () => {
        Alert.alert(
            '',
            'hapus data ini?',
            [
                {text:"hapus",onPress: () => this.props.removeTodo(id)},
                {text:"cancel"}
            ]
        )
    }

    render(){
    return (
        <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <View style={styles.header}>
                <Input placeholder={"ketik disini"}
                    rightIcon={
                        <View style={{flexDirection:'row'}}>
                            <Icon name={"paper-plane"} type={"entypo"} onPress={this.handleButtonAddTodo}/>
                            <Icon name={"edit"} type={"entypo"} onPress={this.handleButtonEdit} />
                        </View>
                    }
                    value={this.state.inputTodoValue}
                    onChangeText={(text) => this.setState({
                        inputTodoValue : text
                    })}
                />
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>

                    {
                        (this.props.todos.todos.length === 0 ) 
                        ?
                        <ListItem title={"Daftar masih kosong"} 
                            containerStyle={{padding:10,borderBottomWidth:0.5}}/>
                        :
                        this.props.todos.todos.map((item,i) => {
                            return (
                                <ListItem key={i} title={item.name}
                                containerStyle={{padding:10,borderBottomWidth:0.5}}
                                rightElement={
                                    <View style={{flexDirection:'row'}}>
                                        <Icon name="edit" type="entypo" onPress={this.handleEdit(item)}/>
                                        <Icon name="trash" type="entypo"onPress={this.handleRemove(item.id)}/>
                                    </View>
                                }/>
                            )
                        })
                    }

            </ScrollView>
        </SafeAreaView>
        </View>
    )
    }
}
    

const styles = StyleSheet.create({
    header: {
        padding: 20,
    },
    screenTitle: {
        textAlign: 'center',
        fontSize: 20,
    }   
});

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo : (value) => dispatch (actionTodos.addTodo(value)),
        editTodo : (value) => dispatch (actionTodos.editTodo(value)),
        removeTodo : (id) => dispatch (actionTodos.removeTodo(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List)
