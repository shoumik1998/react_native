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
import { Navigation } from "react-native-navigation"
import Transition from "../Pages/Transition/Transition";




const go_ashop=(user_name)=>{
  Transition.Go("AShop",user_name,"h_screen")
}



const Product_child = ({data}) => {
    const { user_name,name, description, price, imagepath, currency }=data
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
          <Text style={{ color: "red" }} onPress={() => {go_ashop(user_name)}}>{name}</Text>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image style={{ width: 100, height: 100 }} source={{ uri: imagepath }} />
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
