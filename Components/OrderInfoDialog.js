import React, {useState,useEffect} from "react";

import { Text,Modal,Button,FormControl, Center,Input,NativeBaseProvider,VStack,HStack } from "native-base";
import { Alert } from "react-native";


const OrderInfoDialog=({setNamep,setPhonep,setAddressp,setOrderp,modal_visible_status})=>{
    const  [showModal,setShowModal]=useState(modal_visible_status)
    const [name,setName]=useState()
    const [phone,setPhone]=useState()
    const [address,setAddress]=useState()
    const [order,setOrder]=useState(0)
    useEffect(()=>{setShowModal(modal_visible_status)},[modal_visible_status])
    useEffect(()=>{setOrderp(order)},[order])
   
    
    
    return(
        <NativeBaseProvider>
        <Center>
          {/* {
            showModal>0 && Alert.alert(showModal.toString()+" l "," ",[{text:"cancel" , onPress: ()=>{setShowModal(0)}}])
          } */}
        <Modal isOpen={showModal>0} onClose={() => setShowModal(0)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Order Info</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={(text)=>setNamep(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Phone</FormControl.Label>
              <Input keyboardType="numeric" onChangeText={(text)=>setPhonep(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Address</FormControl.Label>
              <Input onChangeText={(text)=>setAddressp(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            
              
              <Button flex="1" onPress={async() => {
                setName(name)
                setPhone(phone)
                setAddress(address)
                setOrder(order+1)
               
              setShowModal(false);
             
                   
                  
            }}>
                ORDER
              </Button>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </Center>
      </NativeBaseProvider>
    )
}

export default OrderInfoDialog;