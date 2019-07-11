

const initialState = {
    crosswords: []
}

export default function home(state = initialState, action){
    switch (action.type){
        case "GET_DATA":
            return {
              ...state
            };
         case "GET_DATA_FULFILLED":
            return {
              ...state,
              crosswords: action.payload.data.data
            };
         default:
             return state
    }
}