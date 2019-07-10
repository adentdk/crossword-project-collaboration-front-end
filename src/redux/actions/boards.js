import * as types from '../types'
import axios from 'axios'
const url ='http://192.168.0.15:3333/test'


export const addTodo = value => ({
    type : types.ADD_TODO,
    payload : value
})

export const editTodo = value => ({
    type :types.EDIT_TODO,
    payload : value
})

export const removeTodo = id => ({
    type : types.DELETE_TODO,
    payload : id
})

export const decrease = val => ({
    type: types.TEST,
    payload: 1
})


export const increase = val => ({
    type: types.TEST,
    payload: 1
})


export const testFetch = test => {
    // const data= axios.get('')
}