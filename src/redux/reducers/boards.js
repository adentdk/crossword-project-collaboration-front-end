import * as types from '../types'
import axios from 'axios'

// const url='http://192.168.1.117:3333/api/v1'
const initialState = {
    boards:{
        // animals:{
        //     fixedIndex:144,
        //     data:[
               
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
        //         mount:false
        // }
        UIndex:0,
        SIndex:0,
        loadData:true,
        loadAnswer:true,
        crosswordId:2,
        error:false
    },
}

// index,number,value
export default function boards(state = initialState,action) {
    switch( action.type){
        case "ADD" :
            let crosswordName=action.crosswordName.toLowerCase().replace(/\s/g, "")
            let pushed=false
            const {index,value,answerId}=action
            let final=state.boards[crosswordName].data
            let check=0
            let compare
            let mainData=state.boards[crosswordName].data
            answerId.map((AData,AIndex) => {
                mainData.map((data,indexData) => {  
                    if(data.index === index && data.answerId == AData){
                        mainData[indexData].data=value
                        mainData[indexData].answerId=AData
                        check+=1    
                    }
                })
                if(check === 0){
                    final.push({data:value,index,answerId:answerId[AIndex]})
                }
            })
            compare=mainData
            if(check === 0){
                return {
                    ...state,
                    boards:{
                        ...state.boards,
                        [crosswordName]:{
                            ...state.boards[crosswordName],
                            data:final,
                        },
                        UIndex:state.boards.UIndex + 1
                    }
                }
            }else{
                return {
                    ...state,
                    boards:{
                        ...state.boards,
                        [crosswordName]:{
                            ...state.boards[crosswordName],
                            data:compare,
                        },
                        UIndex:state.boards.UIndex + 1
                    }
                }
            }

        //utk default answer 
        case "FETCH_DATA_FULFILLED" :
            const crosswordId = action.payload.data.data[0].crosswords.id
            const crosswordNames = action.payload.data.data[0].crosswords.name.toLowerCase().replace(/\s/g, "")
            if(state.boards[crosswordNames]){
                return {
                    ...state,
                }
            }else{
                //harus bawa payload crosswordName,fixedIndex,crosswordId,userId
            let defaultData=[]
            let checkNum=[]
            let question=[]  
            // let clueIndex=[]
            //from answer
            action.payload.data.data.map((data,index)=> {
                let inputVal=data.answer.split("")
                data.indexes.split(",").map((indexes,splitIndex)=> {
                    defaultData.push(
                        {   
                            id:data.id,
                            index:parseInt(indexes),
                            number:data.number,
                            isClue:data.is_clue,
                            data:inputVal[splitIndex]
                        }
                    )
                    // if(data.isClue){
                    //     clueIndex.push({data:inputVal[splitIndex],index:parseInt(indexes),answerId:data.id})
                    // }
                })
                question.push({answerId:data.id,data:data.question,number:data.number})
            })
            
            return {
                ...state,
                boards:{
                    ...state.boards,
                    [crosswordNames]:{
                        ...state.boards[crosswordNames],
                        default:defaultData,
                        fixedIndex:action.payload.data.data[0].crosswords.total_columns,
                        question,
                        indexes:checkNum
                    },
                    crosswordName:crosswordNames,
                    crosswordId,
                    loadAnswer:false
                }
            }
        }
        
        
        //utk answer
        case "FETCH_ANSWER_FULFILLED" :
            if(action.payload.data.data.length === 0){
                // let checkField=false
                // let emptyIndex=[]
                // let finalResult=[]
                // state.boards[state.boards.crosswordName].default.map((data,index) => {
                //     finalResult.push({data:" ",index:data.index,answerId:data.id})
                // })
                return {
                    ...state,
                    boards:{
                        ...state.boards,
                        [state.boards.crosswordName]:{
                            ...state.boards[state.boards.crosswordName],
                            data:[]
                        },
                        loadData:false
                    }
                }
            }else{
                const filteredData=action.payload.data.data.filter((data,index) => {
                    if(data.answers.crosswords.id === state.boards.crosswordId){
                        return true
                    }
                })
                const crosswordNam=filteredData[0].answers.crosswords.name.toLowerCase().replace(/\s/g, "")
                let word=[]
                let a=[]
                
                filteredData.map((item,mainIndex)=> {
                    word=item.answer.split("")
                    answerIndex=item.answers.indexes.split(",")
                    word.map((frag,wordIndex)=> {
                        if(frag !== " "){
                            a.push({data:word[wordIndex],index:parseInt(answerIndex[wordIndex]),answerId:item.answer_id})
                        }
                    })
                    
                })

                return {
                    ...state,
                    boards:{
                        ...state.boards,
                        [crosswordNam]:{
                            ...state.boards[crosswordNam],
                            data:a
                        },
                        loadData:false
                    }
                }
            }

        case "FETCH_ANSWER_REJECTED" : 
            return {
                ...state,
                boards:{
                    ...state.boards,
                    loadData:false,
                    loadAnswer:false,
                    error:true
                }
            }

        case "FETCH_ANSWER_PENDING" : 
            return {
                ...state,
                boards:{
                    ...state.boards,
                    loadData:true,
                    error:false
                }
            }

        case "FETCH_DATA_PENDING" : 
            return {
                ...state,
                boards:{
                    ...state.boards,
                    loadAnswer:true,
                    error:false
                }
            }

        case "FETCH_DATA_REJECTED" : 
            return {
                ...state,
                boards:{
                    ...state.boards,
                    loadData:false,
                    loadAnswer:false,
                    error:true
                }
            }

        case "SAVE_PENDING" :
            return state
            
        case "SAVE_FULFILLED" :
            return state

        case "SAVE_REJECTED" :
            return state


        case "SUBMIT_PENDING" : 
            return state

        case "SUBMIT_FULFILLED" :
            return {
                ...state,
                boards:{
                    ...state.boards,
                    [state.boards.crosswordName]:{
                        ...state.boards[state.boards.crosswordName],
                        isFinished:action.payload.data.isFinished,
                        msg:action.payload.data.msg,
                        errorData:action.payload.data.data
                    },
                    SIndex:state.boards.SIndex + 1
                }
            }

        case "SUBMIT_REJECTED" : 
            return state
                    
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
