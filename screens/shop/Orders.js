import React from 'react';
import {Text,FlatList, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem'
import { useEffect } from 'react/cjs/react.development';
import * as ordersActions from '../store/actions/order';
import { useState } from 'react';
const Orders = props =>{
  const [isLoading,setIsLoading]=useState(false);
  const orders = useSelector(state=> state.orders.orders);
  const dispatch = useDispatch();

  useEffect(()=>{
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(()=>{
      setIsLoading(false);
    });
  },[dispatch]);

  if(isLoading){
    return(
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <ActivityIndicator size='large' color='black'/>
      </View>
    )
  }
  if(orders.length === 0){
    return <View style={{flex:1,
    justifyContent:'center',alignItems:'center'}}>
      <Text>No orders found . add some</Text>
    </View>
  }
  return <FlatList
  data = {orders}
  renderItem={itemData=><OrderItem amount={itemData.item.totalAmount} items={itemData.item.items}/>}
  />
}

Orders.navigationOptions =navData=> {
  return{
  headerTitle:'ORDERS',
  headerLeft:<HeaderButtons
  HeaderButtonComponent={HeaderButton}>
    <Item title='CART' iconName='md-menu' onPress={()=>{navData.navigation.toggleDrawer();}}/>   
  </HeaderButtons>
}};

export default Orders;