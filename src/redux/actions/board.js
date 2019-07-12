import * as types from '../types'
import axios from 'axios'

import {url} from '../../../assets/variables'

export const getAnswer = (crossword_id) => {
    return {
        type : types.ANSWER,
        payload : axios({
            method : "GET",
            url : `${url.axios}/api/v1/user_answers/${crossword_id}`
        })
    }
}

export const patchAnswer = (answer,crossword_id) => {
    return {
        type : types.ANSWER,
        payload : axios({
            method : "PATCH",
            url : `${url.axios}/api/v1/user_answer/${crossword_id}`,
            data : answer
        })
    }
}

export const cekAnswer = (answer,crossword_id) => {
    return{
        type : types.ANSWER,
        payload : axios({
            method : "POST",
            url : `${url.axios}/api/v1/user_answer/${crossword_id}/cek`,
            data : answer
        })
    }
}