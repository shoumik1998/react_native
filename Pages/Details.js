import React, { Component, useState } from "react";
import { Button, Center, Flex, NativeBaseProvider, Toast,Modal,VStack,HStack } from "native-base";
import { Alert, Image, Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import NumericButton from "../Components/NumericButton";





const Details = (props) => {
  
  

  const screen_dimension = Dimensions.get('window')
  const ratio = screen_dimension.width / 541


  const [sm, stm] = useState(false)
  return (
    <NativeBaseProvider>
      <View style={styless.main_view}>



        <View style={styless.image_view}>
          <Image style={{ width: "100%", height: "100%" }} resizeMode={'contain'} source={{ uri: props.prop.imagepath }} />
        </View>

        <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'space-around' }}>
          {
            props.prop.orderable_status==1 && <NumericButton />
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
            <Modal.Header>Product Info</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Product Name</Text>
                  <Text color="blueGray.400">{props.prop.description}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Price</Text>
                  <Text color="blueGray.400">{props.prop.price} {props.prop.currency}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Shop Name</Text>
                  <Text color="green.500">{props.prop.name}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Shop Region</Text>
                  <Text>{props.prop.region}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Subistrict</Text>
                  <Text color="green.500">{props.prop.subdistrict}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">District</Text>
                  <Text color="green.500">{props.prop.district}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Country</Text>
                  <Text color="green.500">{props.prop.country}</Text>
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
