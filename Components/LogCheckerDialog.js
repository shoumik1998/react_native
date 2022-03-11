import React, {useState,useEffect} from "react";

import { Text,Modal,Button,FormControl, Center,Input,NativeBaseProvider,VStack,HStack } from "native-base";
import { Alert } from "react-native";
import Transition from "../Transition/Transition";
import { Navigation } from "react-native-navigation";


const LogCheckerDialog=({modal_visible_status,props})=>{
    const  [showModal,setShowModal]=useState(modal_visible_status)
    useEffect(()=>{setShowModal(modal_visible_status)},[modal_visible_status])
   
    
    
    return(
        <NativeBaseProvider>
        <Center>
          {/* {
            showModal>0 && Alert.alert(showModal.toString()+" l "," ",[{text:"cancel" , onPress: ()=>{setShowModal(0)}}])
          } */}
        <Modal isOpen={showModal>0} onClose={() => setShowModal(0)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <Text>
                You are not logged in. You must log in to order products. Please log in.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            
              
              <Button flex="1" onPress={() => {
              Transition.Go("Login",null,"home_screen")
            }}>
                GO TO LOGIN PAGE
              </Button>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </Center>
      </NativeBaseProvider>
    )
}

export default LogCheckerDialog;