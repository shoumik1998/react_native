import React, {useState,useEffect} from "react";

import { Text,Modal,Button,FormControl, Center,Input,NativeBaseProvider } from "native-base";
import { Alert } from "react-native";
import realm from "../API/Realm"


const CustomDialog=({modal_visible_status,data})=>{
    const  [showModal,setShowModal]=useState(modal_visible_status)
    useEffect(()=>{setShowModal(modal_visible_status)},[modal_visible_status])
    const {id,
    description,
    price,
    orderable_status,
    imagepath,
    user_name,
    deletion_status,
     name,
    user_password,
    country,
    district,
    subdistrict,
    region,
    Location,
    currency,
    cell_number}=data
    
   
    
    
    return(
        <NativeBaseProvider>
        <Center>
          {/* {
            showModal>0 && Alert.alert(showModal.toString()+" l "," ",[{text:"cancel" , onPress: ()=>{setShowModal(0)}}])
          } */}
        <Modal isOpen={showModal>0} onClose={() =>setShowModal(0)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <Text>
                Save product image and info for later use
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={async () => {

                realm.write(() => {
                  realm.create("Saved", {
                    id: id,
                    description: description,
                    price: price,
                    orderable_status: orderable_status,
                    imagepath:imagepath,
                    user_name: user_name,
                    deletion_status: deletion_status,
                    name: name,
                    user_password: user_password,
                    country: country,
                    district:district,
                    subdistrict: subdistrict,
                    region: region,
                    Location: Location,
                    currency: currency,
                    cell_number: cell_number
                  })
                })

                setShowModal(0);


              }}>
                SAVE
              </Button>

            </Modal.Footer>
          </Modal.Content>

        </Modal>
      </Center>
    </NativeBaseProvider>
  )
}

export default CustomDialog;