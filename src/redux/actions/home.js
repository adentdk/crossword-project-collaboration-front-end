import {url} from '../../../assets/variables'

import axios from 'axios'


export const getData = (token) => ({
    type: "GET_DATA",

    payload: axios({
        method: 'GET',
        url: `${url.axios}/api/v1/crosswords/`,
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
})



