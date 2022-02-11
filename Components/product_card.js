import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Modal, SafeAreaView,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Transition from "../Pages/Transition/Transition";
import Circle from "./round";
import { useToast } from "native-base";








const Product_child = ({data}) => {
    const { orderable_status,user_name,name, description, price, imagepath, currency }=data
    var order_status="none"
    if (orderable_status===1) {
      order_status="flex"
    }else{
      order_status="none"
    }


    const t=useToast()
    
    
    return (
      <View style={{
        shadowRadius: 10,
        elevation: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "white",
        shadowOpacity: 2,
        width: 160,
        height: 200,
      }}>
        <View style={{ margin: 10, alignSelf: "center" }}>
          <Circle style_add={{display : order_status}}/>
          <Text style={{ color: "red" }}  onPress={() => 
            // {Transition.Go("AShop",user_name,"h_screen")}
            t.show({description:"hjii"})
            // Alert.alert("g")
            }>{name}</Text>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image  style={{ width: 100, height: 100 }} source={{ uri: imagepath }} />
        </View>

        <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
          <Text style={{ color: "blue", fontSize: 12 }}>{description}</Text>
        </View>

        <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
          <Text>{price + " " + currency}</Text>
        </View>

      </View>
    );
  };

  export default Product_child;
