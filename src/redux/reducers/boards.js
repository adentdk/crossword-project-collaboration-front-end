import * as types from '../types'
import axios from 'axios'

const url='http://192.168.1.117:3333/api/v1'
const initialState = {
    boards:{
        // animals:{
        //     fixedIndex:144,
        //     data:[
        //         {data:"b",index:0,answerId:'action.id'},
        //         {data:"s",index:1,answerId:'action.id'}
        //     ],
        //     default:[
        //         {id:1,index:0,number:1,isClue:false,val:'a'},
        //         {id:2,index:3,number:1,isClue:false,val:'b'},
        //         {id:3,index:4,number:1,isClue:false,val:'c'},
        //     ],
        //     question:[
        //         {number:1,data:'hewan apa...'},
        //         {number:2,data:'hewan apa...'},
        //         {number:3,data:'hewan apa...'},
        //         {number:4,data:'hewan apa...'},
        //     ],
                // mount:false
        // }
    },
    loading:true,
    error:false
}

// index,number,value
export default function boards(state = initialState,action) {
    switch( action.type){
        case "ADD" :
            const crosswordName=action.crosswordName.toLowerCase().replace(/\s/g, "")
            let pushed=false
            const {index,value,answerId}=action
            let final=state.boards[crosswordName].data
            let check=0
            let compare=state.boards[crosswordName].data.filter((data) => {  
                if(data.index === index){
                    data.data=value
                    data.answerId=answerId
                    return true
                }else {
                    check+=1
                    return true
                }
            })

            if(compare.length === check){
                final.push({data:value,index,answerId})
                return {
                    ...state,
                    boards:{...state.boards,[crosswordName]:{...state.boards[crosswordName],data:final}}
                }
            }else{
                return {
                    ...state,
                    boards:{...state.boards,[crosswordName]:{...state.boards[crosswordName],data:compare}}
                }
            }
        
        case "MOUNT_PENDING" :
            return {
                ...state
            }
            
        case "MOUNT_FULLFILLED" :
            // const crosswordNames=action.crosswordName.toLowerCase().replace(/\s/g, "")
            // if(state.boards[crosswordNames]){
            //     return {
            //         ...state,
            //     }
            // }else{
                //harus bawa payload crosswordName,fixedIndex,crosswordId,userId
                //tolong benerin ya... msh hardCode di Board.js screen :)
            let word=[]
            let a=[]
            let defaultData=[]
            let numbers
            let checkNum=[]
            let question=[]

            return {
                ...state
            }

            // const fetchData = axios.get(url+'/answers/'+action.crosswordId)
            // const fetchData=    [
            //     {
            //         id: 2,
            //         crossword_id: 1,
            //         number: 2,
            //         question: "hewan berkaki dua",
            //         answer: "ayam",
            //         is_clue: false,
            //         indexes: '1,6,11,16'
            //     },
            //     {
            //         id: 3,
            //         crossword_id: 1,
            //         number: 3,
            //         question: "hewan yang seperti chandra",
            //         answer: "ampas",
            //         is_clue: false,
            //         indexes: '15,16,17,18,19'
            //     }
            // ]   
            // const fetchAnswer = axios.get(url+'/user_answers/'+action.userId)             
            // const fetchAnswer=  [
            //     {
            //         id: 2,
            //         user_id:3,
            //         answer: "ayam",
            //         answers:{
            //             indexes:'1,6,11,16'
            //         }
            //     },
            //     {
            //         id: 3,
            //         user_id:3,
            //         answer: "mbee",
            //         answers:{
            //             indexes:'3,6,9,11'
            //         }
            //     },
            // ]   

            //from user_answer
            // action.payload.fetchAnswer.map((item,mainIndex)=> {
            //     word=item.answer.split("")
            //     answerIndex=item.answers.indexes.split(",")
            //     word.map((frag,wordIndex)=> {
            //         a.push({data:word[wordIndex],index:parseInt(answerIndex[wordIndex]),answerId:item.id})
            //     })
            // })

            // //from answer
            // action.fetchData.map((data,index)=> {
            //     let inputVal=data.answer.split("")
            //     data.indexes.split(",").map((indexes,splitIndex)=> {
            //         defaultData.push(
            //             {   
            //                 id:data.id,
            //                 index:parseInt(indexes),
            //                 number:data.number,
            //                 isClue:data.is_clue,
            //                 val:inputVal[splitIndex]
            //             }
            //         )
            //         if( !checkNum.includes(parseInt(indexes)) ) {
            //             question.push({number:data.number,data:data.question})
            //             checkNum.push(parseInt(indexes))
            //         }
            //     })
            // })
            
            // return {
            //     ...state,
            //     boards:{
            //         ...state.boards,
            //         [crosswordNames]:{
            //             data:a,
            //             default:defaultData,
            //             fixedIndex:action.fixedIndex
            //         }
            //     }
            // }
            
        case "MOUNT_REJECTED" :
            return {
                ...state,
                error: true
        }

        case "SAVE" :
            // let dataf=[]
            // let answerf=[]
            // let finalData=[]
            // let indexf=[]
            // let number=[]
            // state.boards[crosswordName].data.map(data => {
            //     if(data.includes(data.number)){
            //         number.push(data.answer)
            //     }
            // })
            
            // state.boards[crosswordName].data.filter((data,index) => {
            //     if(number.includes(data.number)){
                    
            //     }
            // })
            // console.log(finalData)
            
        default:
            return state
    }
}

// {
//     "id": 2,
//     "crossword_id": 1,
//     "number": 2,
//     "question": "hewan berkaki dua",
//     "answer": "ayam",
//     "is_clue": false,
//     "indexes": '1,6,11,16'
// },
// {
//     "id": 3,
//     "crossword_id": 1,
//     "number": 3,
//     "question": "hewan yang seperti chandra",
//     "answer": "ampas",
//     "is_clue": false,
//     "indexes": '15,16,17,18,19'
// },
// let ceknum=[]
// data.map((data,index) => {
//     ceknum.includes(item.number) ? ceknum.push(item.number) : nul 
// })



// {index:0,number:1,isClue:false},
//                 {index:1,number:1,isClue:false},
//                 {index:2,number:1,isClue:false},
//                 {index:3,number:1,isClue:false},
//                 {index:4,number:1,isClue:false},
//                 {index:5,number:1,isClue:false},
//                 {index:6,number:3,isClue:false},
//                 {index:7,number:3,isClue:false},
//                 {index:8,number:3,isClue:false},   
//                 {index:0,number:3,isClue:false}





// switch (action.type) {
//     case types.ADD_TODO : 
//         return {
//             ...state,
//             todos : state.todos.concat(action.payload)
//         }
//     case types.EDIT_TODO :
//         const editItem = state.todos.map(item => {
//             if (item.id == action.payload.id){
//                 return action.payload
//             }
//             return item
//         })
//         return {
//             ...state,
//             todos : editItem
//         }
//     case types.DELETE_TODO : 
//         const removeItem = state.todos.filter(item => item.id != action.payload)
//         return {
//             ...state,
//             todos : removeItem
        
//         }
//     default :
//         return state
// }
