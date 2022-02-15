import React, {useState,useEffect} from "react";

import { Text,Modal,Button,FormControl, Center,Input,NativeBaseProvider } from "native-base";
import { Alert } from "react-native";


const CustomDialog=({modal_visible_status})=>{
    const  [showModal,setShowModal]=useState(modal_visible_status)
    useEffect(()=>{setShowModal(modal_visible_status)},[modal_visible_status])
   
    
    
    return(
        <NativeBaseProvider>
        <Center>
          {/* {
            showModal>0 && Alert.alert(showModal.toString()+" l "," ",[{text:"cancel" , onPress: ()=>{setShowModal(0)}}])
          } */}
        <Modal isOpen={showModal} onClose={() =>setShowModal(0)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(0);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
             setShowModal(0);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </Center>
      </NativeBaseProvider>
    )
}

export default CustomDialog;