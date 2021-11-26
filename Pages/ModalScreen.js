import React, { Component } from "react";
import { Text, View } from "react-native";

class ModalScreen extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent:'center'}}>
        <Text style={{color:'red',fontSize:30}}>This is modal</Text>
      </View>
    );
  }
}

export default ModalScreen;
