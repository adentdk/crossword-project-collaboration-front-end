import * as types from '../types'

const initialState = {
    boards:{
        animals:[
            {data:"k",index:0,number:[1]},
            {data:"u",index:1,number:[1]},
            {data:"d",index:2,number:[1]},
            {data:"a",index:3,number:[1]},
            {data:"a",index:4,number:[2]},
            {data:"y",index:5,number:[2]},
            {data:"a",index:6,number:[2]},
            {data:"m",index:7,number:[2]}   
        ]
    },
    haha:'ini hahahha'
}

// index,number,value
export default function boards(state = initialState,action) {
    switch( action.type){
        case "ADD" :
            const crosswordName=action.crosswordName.toLowerCase()
            const {index,value,number}=action
            const echo=state.boards[crosswordName].filter((data,index) => {
                if(data.index === action.index){
                    data.data=action.value
                    if(data.number.includes(action.number)){
                        data.number.push(action.number)
                        return true
                    }else {
                        return true
                    }
                }else {
                    state.boards[crosswordName].push({data:value,index,number:[number]})
                    return true
                }
            })
                return {
                    ...state,
                    boards:{...state.boards,[crosswordName]:echo}
                }
        case "SUBMIT" : 
                
        default:
            return state
    }
}



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
