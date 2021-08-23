import React from 'react';
import { HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import {Header} from 'react-navigation';

const CustomHeaderButton = props =>{
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='black'/>;
};
  
export default CustomHeaderButton;