import React, { Component, useState,useEffect } from "react";
import { Button, Center, Flex, NativeBaseProvider, Toast,Modal,VStack,HStack } from "native-base";
import { Alert, Image, Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import NumericButton from "../Components/NumericButton";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";




const getParsedDate=(strDate)=>{
  var date=new Date()
  var dd=date.getDate()
  var mm=date.getMonth()+1
  var yyyy=date.getFullYear()
  var hh=date.getHours()
  var min=date.getMinutes()
  var ss=date.getSeconds()
  date =  dd + "-" + mm + "-" + yyyy + "  " + hh + ":" + min + ":" +ss ;
  return date.toString();
}








const Details = (props) => {
  
  const [sm, stm] = useState(false)
  const [number,setNumber]=useState(0)
  const [name,setName]=useState(0)
  const [phone,setPhone]=useState(0)
  const [address,setAddress]=useState(0)
  const [order,setOrder]=useState(0)
  const [response,setresponse]=useState()
    useEffect(()=>{
      if (order>0) {
        orderProduct()
      }
      
    },[order])
    var button_visibility=props.prop.orderable_status;
  

  

  

const orderProduct=async()=>{
  try {
   var phn_email= await AsyncStorage.getItem("phn_gmail")
  } catch (error) {
    
  }
  var response=await Shop_API.onOrderProduct(name,phone,address,
    phn_email,number,props.prop.id,props.prop.description,
    props.prop.price,props.prop.user_name,getParsedDate())

    if (response.response==="ok") {
      Toast.show({title:"ordered successfully"})
      
    }else{
      Toast.show({title:"Order failed...."})

    }

}

if (props.status_code===1) {
  button_visibility=2 
}else{
  button_visibility=1
}



  return (
    <NativeBaseProvider>
      <View style={styless.main_view}>
        <View style={styless.image_view}>
          <Image style={{ width: "100%", height: "100%" }} resizeMode={'contain'} source={{ uri: props.prop.imagepath }} />
          {/* <Text>{props.prop.price}</Text> */}
        </View>

        <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
          {
            button_visibility==1 && <NumericButton
             setNumber={setNumber}
             setName={setName} setPhone={setPhone} setAddress={setAddress}
             setOrder={setOrder}
              />
          }
          {
            props.prop.order_status===2 && 
            <TouchableOpacity style={{
              justifyContent: 'center', alignItems: 'center',
              backgroundColor: "#0000ff", height: '30%', width: '40%', borderRadius: 6
          }} onPress={() => { }}>
              <Text style={{ color: "white" }}>Product Delivered</Text>
          </TouchableOpacity>
          }

          
          <TouchableOpacity onPress={() => stm(true)} style={{ width: "10%", height: "100%", justifyContent: 'center', marginTop: '8%' }} >

            <Image style={{ width: '100%', alignSelf: 'center', resizeMode: 'contain', tintColor: '#696969' }} source={require('../Assets/info256.png')} />

          </TouchableOpacity>

          

        </View>
      </View>
      <Center>
        <Modal isOpen={sm} onClose={() => stm(false)} size="lg">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header >Product Info</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#ff7373"}} fontWeight="medium">Product Name</Text>
                  <Text style={{color:"#ff7373"}}>{props.prop.description}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#ff7373"}} fontWeight="medium">Price</Text>
                  <Text style={{color:"#ff7373"}}>{props.prop.price} {props.prop.currency}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#0000ff"}} fontWeight="medium">Shop Name</Text>
                  <Text style={{color:"#0000ff"}} color="green.500">{props.prop.name}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#0000ff", fontStyle:'italic'}} fontWeight="medium">Shop Location</Text>
                  <Text style={{color:"#0000ff",fontStyle:'italic'}} color="green.500">{props.prop.Location}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#0000ff"}} fontWeight="medium">Shop Region</Text>
                  <Text style={{color:"#0000ff"}}>{props.prop.region}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#065535"}} fontWeight="medium">Subistrict</Text>
                  <Text style={{color:"#065535"}} color="green.500">{props.prop.subdistrict}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#065535"}} fontWeight="medium">District</Text>
                  <Text style={{color:"#065535"}} color="green.500">{props.prop.district}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text style={{color:"#065535"}} fontWeight="medium">Country</Text>
                  <Text style={{color:"#065535"}} color="green.500">{props.prop.country}</Text>
                </HStack>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
      

    </NativeBaseProvider>
  )
}



const styless = StyleSheet.create({
  main_view: {
    width: "100%",
    height: "100%",
    justifyContent: 'space-around',


  },
  image_view: {

    width: "100%",
    height: "60%",

  },
  title_styless:{
    color:"green"
  }
})



export default Details;
