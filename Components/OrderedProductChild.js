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
  View,
} from "react-native";

import Transition from "../Transition/Transition";
import Circle from "./Round";
import { useToast } from "native-base";








const OrderedProductChild = ({data,selected_id}) => {
    const {user_name,id, description,  price, imagepath, currency }=data
     
    
    return (
      <View style={{
        shadowRadius: 10,
        elevation: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: selected_id ? "gray" : "white",
        shadowOpacity: 2,
        width: 160,
        height: 200,
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
