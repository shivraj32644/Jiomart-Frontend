import axios from 'axios';

const URL = 'https://jiomart-server.cyclic.app/cart';

export const addToCart = async(data) => {
    // console.log(data)
    try {
        let res = await axios.post(`${URL}/addCart`, data);
        
        return res;
    } catch (error) {
        console.log("Error while adding in cart",error);
    }

}    

export const findItemInCart = async (id) => {
    // console.log("line in 16", id);
    
    try {
        let res = await axios.get(`${URL}/Item/${id}`)
        let result = await res.data;
        return result;
    } catch (error) {
        return "Something went wrong in findItemBy Cart"
    }
}

export const getCart = async() => {

    try {
       let res= await axios.get(`${URL}/Item`);
       let result = await res.data;
    //    console.log(result)
       return result;
    } catch (error) {
        console.log("Error while Fetching Data from api.js",error);
        return error.response;
    }

}
  


export const decCart = async(data) => {

    try {
       return await axios.patch(`${URL}/decCart`,data)
    } catch (error) {
        console.log("Error while decreasing quantity of cart Data from api.js",error);
        return error.response;
    }
}

export const incCart = async({id,item_quantity}) => {
   
    const data = {item_quantity}
    console.log(data);
    try {
       return await axios.patch(`${URL}/incCart/${id}`,data)
   
    } catch (error) {
        console.log("Error while increasing quantity of cart Data from api.js",error);
        return error.response;
    }
}

