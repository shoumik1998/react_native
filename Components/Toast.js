import React from "react";
import { useToast,Center,Button, NativeBaseProvider,Toast } from "native-base";
import { Alert } from "react-native";


const Example = (status) => {
  
    if (status===true) {
      Alert.alert("yes")
    }else{
Alert.alert("No")
    }
     
    
    
  }

  export default Example;