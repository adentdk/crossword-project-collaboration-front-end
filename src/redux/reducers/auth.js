import * as types from '../types'

const initialState = {
    data : [],
    isLoading : false,
    isError : false,
    errorMessage : "",
}

export default function auth(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_PENDING :
            return {
                ...state,
                isLoading : true,
                isError : false,
                errorMessage : ''
            }
        case types.LOGIN_REJECTED : 
            
            return {
                ...state,
                isLoading : false,
                isError : true,
                errorMessage : action.payload.response.data.message
            }
        
            
        case types.LOGIN_FULFILLED : 
            return {
                ...state,
                isLoading : false,
                isError : false,
                data : action.payload.data
            }
    
        case types.REGISTER_PENDING : 
            return {
                ...state,
                isLoading : true,
                isError : false,
                errorMessage : '',
                data : []
            }
        
        case types.REGISTER_REJECTED : 
            return {
                ...state,
                isLoading : false,
                isError :true,
                errorMessage : action.payload.response.data.message
            }
        
        case types.REGISTER_FULFILED : 
            return {
                ...state,
                isError : false,
                isLoading :false,
                data : action.payload.data
            }
        default : 
            return state
    }
}