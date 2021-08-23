import React from 'react';
import {View, Image,ScrollView,Text,Button,StyleSheet } from 'react-native';
import * as cartActions from '../store/actions/cart';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
const ProductDetails=props=>{
const productId = props.navigation.getParam('productId');
const dispatch =useDispatch();
const selectedProduct = useSelector(state=>state.products.availableProducts.find(prod=>prod.id=== productId));
  return(
  <ScrollView>
    <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
    <View style={styles.jash}>
    <Button color={Colors.primary} title="ADD TO CART" onPress={()=>{dispatch(cartActions.addToCart(selectedProduct));}}/></View>
  <Text style={styles.price}>₹{selectedProduct.price.toFixed(2)}</Text>
    <Text style={styles.description}>{selectedProduct.description}</Text>
  </ScrollView>

);
};

ProductDetails.navigationOptions = navData =>{
return{
  headerTitle:navData.navigation.getParam('productTitle')
};
};

const styles=StyleSheet.create({
  image:{
    width:'100%',
    height:300
  },
  description:{
  fontSize: 20,
  color:'#888',
  textAlign:'center',
  marginVertical:20,
  },jash:{
    marginVertical:10,
    alignItems:'center'
  },
  price:{
    fontSize:14,
    textAlign:'center',
    marginVertical:10
  } 
});

export default ProductDetails;