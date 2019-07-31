import * as types from '../types'
import axios from 'axios'
const url='http://192.168.0.13:3333/api/v1'
const crosswordName='testgan'
const fixedIndex=25
const crosswordId=2
const userId=3

export const fetchData = (crosswordName='testGan',fixedIndex=25,crosswordId=2,userId=3) =>({
    type:'FETCH_DATA',
    payload:axios.get(url+'/answers/'+crosswordId)
})

export const fetchAnswer = (crosswordName='testGan',fixedIndex=25,crosswordId=2,userId=3) =>({
    
    type:'FETCH_ANSWER',
    payload:axios.get(url+'/user_answers/'+userId)
})

export const getInput = (index,value,answerId,crosswordName="namanamakota") => (
    {
        type:'ADD',
        index,
        value,
        answerId,
        crosswordName:'namanamakota',
        // fetchAnswer : axios.get(url+'/user_answers/'+action.userId)
    }
)

export const save = (data,userId) => {
    return {
        type:"SAVE",
        payload: axios.post(url+'/save/'+userId,{
            data
        })
    }
}

export const submit = (data,crosswordId,userId) => ({
    type: "SUBMIT",
    payload: axios.post(`${url}/user_crossword/${crosswordId}/${userId}`,{
        data
    })
})

// export const checkAnswer = (data,crosswordId,userId) => ({
//     type:"ANSWER_CHECK",
//     payload:axios.post(url+'/user_crossword/'+crosswordId+'/'+userId, {
//         data
//     })
// })

// export const addTodo = value => ({
//     type : types.ADD_TODO,
//     payload : value
// })

// export const editTodo = value => ({
//     type :types.EDIT_TODO,
//     payload : value
// })

// export const removeTodo = id => ({
//     type : types.DELETE_TODO,
//     payload : id
// })

// export const decrease = val => ({
//     type: types.TEST,
//     payload: 1
// })


// export const increase = val => ({
//     type: types.TEST,
//     payload: 1
// })


// export const testFetch = test => {
//     // const data= axios.get('')
// }





// let word=[]
    // let a=[]
    // let numbers
    // let indexes=[]
    // action.data.map((item,mainIndex)=> {
    //     word=item.answer.split("")
    //     answerIndex=item.indexes.split("")
    //     numbers=item.number
    //     indexes=item.indexes.split()
    //     word.map((frag,wordIndex)=> {
    //         a.push({data:word[wordIndex],number:numbers,index:answerIndex[wordIndex]})
    //     })
    // })

    // state.boards[crosswordName].map((data,index) => {
    //     number.includes(data.number) ? number.push(data.number) : true
    // })

    // let final=state.boards[crosswordName].filter((data,index) => {
    //     if(number.includes(data.number)){
            
    //         finalData.push(
    //             {
    //                 answer
    //             }
    //         )
    //     }
    // })
    // for (let index = 0; index < state.boards[crosswordName].length; index++) {
    //      word+=data[index].data
    // }  