import React, { Component } from "react";
import { Button, TextInput, View, Alert, Text, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shop_API from "../API/Shop_API";
import Transition from "../Transition/Transition";


class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      phn_gmail: '',
      response: [],
      name: '',
      test: ''

    }
    Navigation.events().bindComponent(this)
  }

  



  login = async () => {
    const response = await Shop_API.onLoginAPI(this.state.phn_gmail, this.state.password)

    this.setState({ response: response })
    console.log(this.state.response)


    Object.entries(this.state.response).map(async ([k, v]) => {
      
      if (k === "name") {
        try {
          AsyncStorage.setItem("name", v)
        } catch (e) {

        }

      } else if (k === "response") {
        if (v === "success") {
          try {
            await AsyncStorage.setItem("phn_gmail", this.state.phn_gmail)
            Transition.Set_Root('Home')
            


          } catch (e) {
            Alert.alert(e.toString())
          }
        } else {
          Alert.alert('no response')
        }

      }

    })
  }

  goHome = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Home',

      }
    })
  }


  goRegistration = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Registration',
        options: {
          topBar: {
            visible: false
          }
        }
      }
    })
  }

    
  render() {
    return (
      <View style={{ alignItems: "center", flex: 1, backgroundColor: "#FFFFF0" }}>
        <View style={{ alignSelf: "center", width: "100%", height: "10%", marginTop: "30%" }}>
          <TextInput onChangeText={(text) => { this.setState({ phn_gmail: text }) }} placeholder="User Name...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
        </View>
        <View style={{ alignSelf: "center", width: "100%", height: "10%", margin: "5%" }}>
          <TextInput onChangeText={(text) => { this.setState({ password: text }) }} placeholder="Password...." style={{ elevation: 2, borderRadius: 10, width: "85%", height: "90%", margin: 10, alignSelf: "center", backgroundColor: "white" }} />
        </View>
        <TouchableOpacity onPress={()=>this.login()} style={{ elevation: 2, borderRadius: 10, backgroundColor: "#c71585", alignSelf: "center", width: "50%", height: "8%", margin: "5%", alignItems: "center", justifyContent: "center" }}>
          <View >
            <Text style={{ fontSize: 25, color: "white" }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        


        <View>
          <Text onPress={() => { this.goRegistration() }} style={{ color: 'blue', fontSize: 18 }}>I have no account</Text>
        </View>
      </View>
    );
  }
}

export default Login;
