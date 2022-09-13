import React, { Component, useState } from "react";
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
  Dimensions
} from "react-native";

import Transition from "../Transition/Transition";
import Circle from "./Round";
import { useToast } from "native-base";








const Product_child = ({ data, selected_id }) => {
  const screenWidth = Dimensions.get('window').width
 const screenHeight = Dimensions.get('window').height
  const { orderable_status, user_name, name, description, price, imagepath, currency } = data
  var order_status = "none"
  var color = "white"


  if (orderable_status === 1) {
    order_status = "flex"
  } else {
    order_status = "none"
  }

  const isSelected = (data.id === selected_id);

  const bg_color = isSelected ? "red" : "white"

  // for(let valu of selected_ids){
  //   console.log(valu)
  // }
  // console.log(selected_id)
  // console.log("mm")
  //Alert.alert(selected_id.toString())

  return (
    <View style={{
      shadowRadius: 10,
      elevation: 5,
      margin: 5,
      borderRadius: 5,
      backgroundColor: selected_id ? "gray" : "white",
      shadowOpacity: 2,
      width: screenWidth/2.2,
      height: screenHeight/3,
    }}>
      <View style={{ margin: 10, alignSelf: "center" }}>
        <Circle style_add={{ display: order_status, width: 5, height: 5, borderRadius: 2 }} />
        <Text style={{ color: "red" }} onPress={() => { Transition.Go("AShop", user_name, "h_screen") }


        }>{name}</Text>
      </View>

      <View style={{ alignSelf: "center" }}>
        <Image style={{ width: 100, height: 100 }} resizeMode={'contain'} source={{ uri: imagepath }} />
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
