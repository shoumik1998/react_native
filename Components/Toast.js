import React from "react";
import { useToast,Center,Button, NativeBaseProvider } from "native-base";
import { Alert } from "react-native";


const Example = () => {
    const toast = useToast();
    return(
    <NativeBaseProvider>
        <Center>
        <Button onPress={() =>{ toast.show({
        description :"hey",
        placement:"top"
      })}}>
          Show Toast
        </Button>
      </Center>
    </NativeBaseProvider>
    )
    
  }

  export default Example;