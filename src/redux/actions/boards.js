import * as types from '../types'
import axios from 'axios'
const url='http://192.168.0.13:3333/api/v1'
const crosswordName='testgan'
const fixedIndex=25
const crosswordId=2
const userId=3

let answer = [
    {
        "id": 1,
        "crossword_id": 1,
        "number": 1,
        "question": "hewan berkaki empat",
        "answer": "jaran",
        "is_clue": true,
        "indexes": '0,1,2,3,4'
    },
    {
        "id": 2,
        "crossword_id": 1,
        "number": 2,
        "question": "hewan berkaki dua",
        "answer": "ayam",
        "is_clue": false,
        "indexes": '1,6,11,16'
    },
    {
        "id": 3,
        "crossword_id": 1,
        "number": 3,
        "question": "hewan yang seperti chandra",
        "answer": "ampas",
        "is_clue": false,
        "indexes": '15,16,17,18,19'
    },
]
    kj=[
        {data:"k",index:0,number:1},
        {data:"u",index:1,number:1},
        {data:"d",index:2,number:1},
        {data:"a",index:3,number:1},
        {data:"a",index:4,number:2},
        {data:"y",index:5,number:2},
        {data:"a",index:6,number:2},
        {data:"a",index:7,number:2}   
    ]
    
    animal=[
        {data:"y",index:5,number:2},
        {data:"a",index:3,number:1},
        {data:"u",index:1,number:1},
        {data:"d",index:2,number:1},
        {data:"k",index:0,number:1},
        {data:"a",index:4,number:2},
        {data:"a",index:6,number:2},
        {data:"m",index:7,number:2}   
    ]

    // const crosswordId=2
    // const userId=3

export const fetchData= (crosswordName='testGan',fixedIndex=25,crosswordId=3,userId=3) =>({
    
        type:'FETCH_DATA',
        crosswordName,
        fixedIndex,
        crosswordId,
        userId,
        payload:axios.get(url+'/answers/'+crosswordId)
})

export const fetchAnswer= (crosswordName='testGan',fixedIndex=25,crosswordId=2,userId=3) =>({
    
    type:'FETCH_ANSWER',
    crosswordName,
    fixedIndex,
    crosswordId,
    payload:axios.get(url+'/user_answers/3'),
    userId,
})

export const getInput=(index,value,answerId=3,crosswordName="testGan") => (
    {
        type:'ADD',
        index,
        value,
        answerId,
        crosswordName:'nama-namakota',
        // fetchAnswer : axios.get(url+'/user_answers/'+action.userId)
    }
)


export const submit = (state,boadrdName) => {

    // const crosswordName=boadrdName.toLowerCase().replace(/\s/g, "")
    // let data=state.boards[crosswordName]
    // console.log('ini aksi submit gan')
    // let word=''
    // let number=[]
    // let finalData=[]
    
    // let wrong=[]

    // let hh=animal.filter((main,animalIndex) => {
    //     let done=false
    //     const {data,index,number}=main
    //     kj.map((item,indexe) => {
    //         if(JSON.stringify(item) === JSON.stringify(main)){
    //             done=true
    //             return true
    //         }
    //     })
    //     if (done){
    //         return true
    //     }else {
    //         wrong.push({index,number})
    //     }
    // })

    // if(hh.length === animal.length){
    //     alert('benar semua')
    // }else {
    //     console.log('hh.length',wrong.length)
    // } 
}

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