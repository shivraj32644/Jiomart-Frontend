import { SET_ISAUTH, SET_LOADING, SET_TOKEN } from "./actionTypes"

export const set_isauth = (data)=>{
return {
    type : SET_ISAUTH,
    payload : data
}
}

export const set_token = (data)=>{
    return {
        type : SET_TOKEN,
        payload : data
    }
    }
    
  export const set_loading = (data)=>{
    return {
        type : SET_LOADING,
        payload : data
    }
  }  

  export const Login =(data,inputotp,otp)=>async (dispatch)=>{
               dispatch(set_loading(true));
        let res = await fetch(`https://jiomart-server.cyclic.app/auth/login`,{
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        let data2 = await res.json();
        // console.log(data2)
        dispatch(set_loading(false))
        if(!data2.token){
            dispatch(set_isauth(false));
        }else if(data2.token!=''){
            if(otp===parseInt(inputotp)){
                // console.log(data2.id);
                localStorage.setItem("user_id",data2.id);
                dispatch(set_token(data2.token))
                dispatch(set_isauth(true));
            }else{
                dispatch(set_isauth(false));
            }
         
        } 
  }