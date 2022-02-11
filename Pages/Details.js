import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";
import Circle from "../Components/round";
import Example from "../Components/Toast";
import { Button, Center, NativeBaseProvider, useToast } from "native-base";


const  Details = ()=>  {

  const toast=useToast()

    return (
      
      <NativeBaseProvider>
        <Center>
         
        <Example/>
        {/* <Image style={{width:"90%", height:"90%"}} source={{uri:this.props.imagepath}}/> */}
        <Button onPress={()=>{toast.show({description:"hey",placement:"top"})}}>Toasst</Button>
        
        
      
        </Center>
        
      </NativeBaseProvider>
      

    )

  
  
}

export default Details;
