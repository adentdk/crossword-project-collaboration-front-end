import * as types from '../types'

const initialState = {
    todo : '',
    todos : [],
}

export default function todos(state = initialState,action) {
    switch (action.type) {
        case types.ADD_TODO : 
            return {
                ...state,
                todos : state.todos.concat(action.payload)
            }
        case types.EDIT_TODO :
            const editItem = state.todos.map(item => {
                if (item.id == action.payload.id){
                    return action.payload
                }
                return item
                
            })
            return {
                ...state,
                todos : editItem
            }
        case types.DELETE_TODO : 
            const removeItem = state.todos.filter(item => item.id != action.payload)
            return {
                ...state,
                todos : removeItem
            
            }
        default :
            return state
    }
}
