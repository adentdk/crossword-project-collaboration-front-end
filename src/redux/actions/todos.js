import * as types from '../types'

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
