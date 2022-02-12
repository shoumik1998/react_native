import React,{useState} from "react";

import { Text,Modal,Button,FormControl, Center,Input,NativeBaseProvider } from "native-base";
import { Alert } from "react-native";


const CustomDialog=({display_status})=>{
    const  [showModal,setShowModal]=useState(display_status)
    
    
    return(
        <NativeBaseProvider>
        <Center>
        <Modal isOpen={showModal!=0} onClose={() =>setShowModal(0)}>
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
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
             setShowModal(false);
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