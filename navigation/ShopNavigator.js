import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import Colors from '../constants/Colors'
import ProductsOverview from '../screens/shop/ProductOverview';
import Orders from '../screens/shop/Orders';
import Cart from '../screens/shop/Cart';
import {Ionicons} from '@expo/vector-icons';
import ProductDetails from '../screens/shop/ProductDetails';
import EditProduct from '../screens/user/EditProduct';
import * as authActions from '../screens/store/actions/auth'
import UserProduct from '../screens/user/UserProduct';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen'
import { Button, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
const ProductsNavigator = createStackNavigator({
  ProductsOverview:ProductsOverview,
  ProductDetails:ProductDetails,
  Cart:Cart
},{navigationOptions:{
  drawerIcon:drawerConfig =><Ionicons name="ios-cart"
  size={23}/>
}
  
});
const OrdersNavigator = createStackNavigator({
  Orders:Orders
},{navigationOptions:{
  drawerIcon:drawerConfig =><Ionicons name="ios-list"
  size={23}/>
}
  
})

const AdminNavigator = createStackNavigator({
  UserProduct:UserProduct ,
  EditProduct:EditProduct
},{navigationOptions:{
  drawerIcon:drawerConfig =><Ionicons name="md-create"
  size={23}/>
}
  
})

const ShopNavigator = createDrawerNavigator({
  Products:ProductsNavigator,
  Orders:OrdersNavigator,
  Admin:AdminNavigator
},{
  contentOptions:{
    activeTintColor:'blue'
  },
  contentComponent:props=>{
    const dispatch = useDispatch();
    return <View style={{flex:1,paddingTop:28}}>
      <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
        <DrawerItems {...props}/>
        <Button title="Logout" color='black' onPress={()=>{
          dispatch(authActions.logout())
          // props.navigation.navigate('Auth');
        }}/>
      </SafeAreaView>
    </View>
  }
});

const AuthNavigator = createStackNavigator({
  Auth:AuthScreen
})

const MainNavigator = createSwitchNavigator({
  Startup:StartupScreen,
  Auth:AuthScreen,
  Shop:ShopNavigator
})
export default createAppContainer(MainNavigator);