import React, { Component } from "react";
import { Alert, Text, TextInput, View } from "react-native";

class Registration extends Component {
  render() {
    return (
      <View style={{alignItems:"center",flex:1,justifyContent:"center",backgroundColor:"#FFFFF0"}}>
        <View style={{alignSelf:"center",width:"100%",height:"10%",margin:"5%"}}>
          <TextInput placeholder="Name...." style={{elevation:2,borderRadius:10,width:"85%",height:"90%",margin:10,alignSelf:"center",backgroundColor:"white"}}/>
        </View>
        <View style={{alignSelf:"center",width:"100%",height:"10%"}}>
          <TextInput placeholder="User Name...." style={{elevation:2,borderRadius:10,width:"85%",height:"90%",margin:10,alignSelf:"center",backgroundColor:"white"}}/>
        </View>
        <View style={{alignSelf:"center",width:"100%",height:"10%",margin:"5%"}}>
          <TextInput placeholder="Password...." style={{elevation:2,borderRadius:10,width:"85%",height:"90%",margin:10,alignSelf:"center",backgroundColor:"white"}}/>
        </View>
        <View style={{elevation:2,borderRadius:20,backgroundColor:"#1e90ff",alignSelf:"center",width:"50%",height:"8%",margin:"5%",alignItems:"center",justifyContent:"center"}}>
          <Text onPress={()=>{Alert.alert('hmmm')}} style={{fontSize:23,color:"white"}}>REGISTER</Text>
        </View>
      </View>
    );
  }
}

export default Registration;
