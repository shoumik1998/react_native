import React, { Component, useState } from "react";
import { Button, Center, NativeBaseProvider, Toast } from "native-base";
import { Alert, Image, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";
import Circle from "../Components/Round";
import Example from "../Components/Toast";
import CustomDialog from "../Components/CustomDialog";



const  Details = ()=>  {
  const [sm,stm]=useState(0)

  

    return (
      <NativeBaseProvider>
        <Center>
          {
            sm>0
            // && Alert.alert(sm.toString()) 
            &&  <CustomDialog modal_visible_status={sm}/>
          }

         <Button onPress={()=>{
           stm(sm+1) 
           }}>
             Toasst
           </Button>
          
        
        {/* <Image style={{width:"90%", height:"90%"}} source={{uri:this.props.imagepath}}/> */}
        </Center> 
      </NativeBaseProvider>
    ) 
}

export default Details;
