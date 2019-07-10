import * as types from '../types'
import axios from 'axios'

export const Login = ({email,password})  => {
   
   return {
       type : types.LOGIN_PENDING,
       payload : axios({
           method : 'POST',
           url : 'http://192.168.0.18:3333/auth/login',
           data : {
            email,
            password
           }
       })
   }
}

export const LoginSuccess = data => {
    return {
        type : types.LOGIN_FULFILLED,
        payload : data
    }
}  