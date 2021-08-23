import { ReactReduxContext } from "react-redux";
import Order from "../../../models/order";
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders=()=>{
  return async (dispatch,getState) => {
    const userId = getState().auth.userId;
        try{
    const response = await fetch(`https://jash4-500e7-default-rtdb.firebaseio.com/orders/${userId}.json`);
    
    if(!response.ok){
          throw new Error('Something went wrong!')
        }
      const resData = await response.json();
      // console.log(resData);
      const loadedOrders=[];
      for (const key in resData){
        loadedOrders.push(new Order(key,resData[key].cartItem,resData[key].totalAmount));
      }
    dispatch({type:SET_ORDER,orders:loadedOrders});
    }catch(err){
      throw err;
    } 
    };}

export const addOrder = (cartItem,totalAmount)=>{
  return async (dispatch,getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(`https://jash4-500e7-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        cartItem,
        totalAmount
      })
    });

    const resData = await response.json();
  dispatch({ type:ADD_ORDER,
  orderData:{id:resData.name,items:cartItem,amount:totalAmount}
}) 
};
};