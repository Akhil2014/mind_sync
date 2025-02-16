import { LOGIN_API_FAILURE, LOGIN_API_REQUEST, LOGIN_API_SUCCESS } from "./actionType"

const initialState = {
    isLoading:false,
    isAuth:false,
    isError:false,
    istoken:""
}


export const AuthReducer = (state = initialState , {type , payload}) => {
    switch(type){
        case LOGIN_API_REQUEST : {
            return {
                ...state,
                isLoading:true,
            }
        }
        case LOGIN_API_SUCCESS : {
            return {
                ...state,
                isLoading:false,
                istoken:payload,
                isAuth:true
            }
        }
        case LOGIN_API_FAILURE : {
            return {
                ...state,
                isError:true,
                isLoading:false,
                isAuth:false,
                istoken:""
            }
        }
        default:
            return state
    }
}