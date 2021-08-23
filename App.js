import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import cartReducer from './screens/store/reducers/cart';
import ordersReducer from './screens/store/reducers/order';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './screens/store/reducers/products';
import authReducer from './screens/store/reducers/auth';
import ShopNavigator from './navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk)); 
export default function App() {

  return (
    <Provider store={store}>
      <ShopNavigator/>
     </Provider>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
