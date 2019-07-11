import * as types from '../types'
import axios from 'axios'
import {url} from '../../../assets/variables'

export const login = ({email,password})  => {
   
   return {
       type : types.LOGIN,
       payload : axios({
           method : 'POST',
           url : `${url.axios}/auth/login`,
           data : {
            email,
            password
           }
       })
   }
}

export const register = (data) => {

    return {
        type : types.REGISTER,
        payload : axios({
            method : 'POST',
            url : `${url.axios}/auth/register`,
            data : data,
        })
    }

}