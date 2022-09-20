import React, { Component,useState } from "react";
import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Modal, SafeAreaView,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,Dimensions
} from "react-native";

import Transition from "../Transition/Transition";
import Circle from "./Round";
import { useToast } from "native-base";








const OrderedProductChild = ({data,selected_id}) => {
  const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
    const {user_name,id, description,  price, imagepath, currency,order_status }=data

    const getBackColor = () => {
      let color = "#e6e6fa";
      if (order_status === 0) {
          color = "#e6e6fa"
      } else if (order_status === 1) {
          color = "#20b2a0"
      } else if (order_status === 2) {
          color = "#66cc0c"
      }
      else if (order_status === 3) {
        color = "#ff0000"
    }
    else if (order_status === 4) {
      color = "#0000ff"
  }
      return color;
  }
     
    
    return (
      <View style={{
        shadowRadius: 10,
        elevation: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: getBackColor(),
       
        shadowOpacity: 2,
        width: screenWidth/2.2,
        height: screenHeight/3,
      }}>
        <View style={{ margin: 10, alignSelf: "center" }}>
          
          
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image  style={{ width: 100, height: 100 }} resizeMode={'contain'} source={{ uri: imagepath }} />
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

  export default OrderedProductChild;
