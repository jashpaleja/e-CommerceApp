import React,{useEffect,useState,useCallback} from 'react';
import {FlatList,Button,ActivityIndicator, View, Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import * as productsActions from '../store/actions/products';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
const ProductOverview =  props => {
  const [error,setError] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const products = useSelector(state=>state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts=useCallback( async ()=>{   
    console.log("LOADING PRODUCTS")
    setError(null);
    
    try{  
    await dispatch(productsActions.fetchProducts());
    }catch(err){
      setError(err.message);
    }
},[dispatch,setIsLoading,setError])

useEffect(()=>{
  const willFocusSub = props.navigation.addListener('willFocus',loadProducts);
    return ()=>{
      willFocusSub.remove();
    };
},[loadProducts])
  
useEffect(()=>{
  setIsLoading(true);  
  loadProducts().then(()=>{
    setIsLoading(false)
  });
  },[dispatch,loadProducts])

  const selectItemHandler=(id,title)=>
    {props.navigation.navigate('ProductDetails',{productId:id,
      productTitle:title});}
  
if(error){
  <View style={{flex:1,
    justifyContent:'center',alignItems:'center'}}>
      <Text color='red'>An error occured!!</Text>
    <Button title="Try Again" onPress={loadProducts}/>
    </View>
}

if(isLoading){
  return(
    <View style={{flex:1,
    justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color='black'/>
    </View>
  );
}
if(!isLoading && products.length === 0){
  return(
    <View style={{flex:1,
    justifyContent:'center',alignItems:'center'}}>
      <Text>No products found!!</Text>
    </View>
  );
}
return (<FlatList 
  onRefresh={loadProducts}
  refreshing={isLoading}
  data={products} 
  keyExtractor={item=>item.id} 
  renderItem={itemData=><ProductItem image={itemData.item.imageUrl} title={itemData.item.title}
  price={itemData.item.price} onSelect={()=>{
    selectItemHandler(itemData.item.id,itemData.item.title)
  }}>
    <Button title='View Details' onPress={()=>{
    selectItemHandler(itemData.item.id,itemData.item.title)
  }}/>
      <Button title='Add to Cart' onPress={()=>{
    dispatch(cartActions.addToCart(itemData.item))
  }}/>
  </ProductItem>}
  />
  );
};

ProductOverview.navigationOptions =navData=> {
  return{
  headerTitle:'All Products',
  headerLeft:<HeaderButtons
  HeaderButtonComponent={HeaderButton}>
    <Item title='MENU' iconName='md-menu' onPress={()=>{navData.navigation.toggleDrawer();}}/>   
  </HeaderButtons>,
  headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='CART' iconName='md-cart' onPress={()=>{navData.navigation.navigate('Cart')}}/>
  </HeaderButtons>
};};

export default ProductOverview;