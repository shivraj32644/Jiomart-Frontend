import { SET_ISAUTH, SET_LOADING, SET_TOKEN } from "./actionTypes"

const initState = {
    isAuth : false,
    token : '',
    loading : false,
}
export const Authreduce = (state=initState,{type,payload})=>{
    switch(type){
        case SET_ISAUTH : {
            return {...state,isAuth :payload}
        }
        case SET_TOKEN : {
            return {...state,token :payload}
        }
        case SET_LOADING : {
            return {...state,loading :payload}
        }
        default :{
            return state;
        }
    }
}