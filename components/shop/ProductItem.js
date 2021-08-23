import React from 'react';
import {TouchableOpacity,Text, View ,StyleSheet,Image,Button} from 'react-native';
// import Colors  from '../../constants/Colors';

const ProductItem = props=>{
return(<View style={styles.product}>
  <View style={styles.touch}>
  <TouchableOpacity onPress={props.onSelect} useForeground>
  <View>
    <View style={styles.imageContainer}>
    <Image style={styles.image} source={{uri:props.image}} />
    </View>
    <View style={styles.detail}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.price}>₹{props.price.toFixed(2)}</Text>
    </View>

    <View style={styles.action}>
      {props.children}
    </View>
    </View>
     </TouchableOpacity>
     </View>
  </View>
 
);


};

const styles=StyleSheet.create({
product:{
  shadowColor:'black',
  shadowOpacity:0.26,
  shadowOffset:{width:0,height:2},
  shadowRadius:8,
  elevation:5,
  borderRadius:10,
  backgroundColor:'white',
  height:300, 
  margin:20,
  overflow:'hidden'
},touch:{
  borderRadius:10
},
detail:{
  alignItems:'center',
  height:'15%',
  padding:10
},
image:{
  width:'100%',
  height:'100%'
},title:{
  fontSize:18,
  marginVertical:4
},imageContainer:{
  width:'100%',
  height:'60%',
  borderTopLeftRadius:10,
  borderTopRightRadius:10,
  overflow:'hidden'
},

price:{
  fontSize:14,
  color:'#888'
},
action:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  height:'25%',
  padding:30
}
});

export default ProductItem;