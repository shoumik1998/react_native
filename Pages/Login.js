import React, { Component } from "react";
import { Button, TextInput, View, Alert, Text } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends Component {


  constructor(props) {
    super(props);
    this.state={
      username:'',
      password:'',
      response:[],
      name_:'',
      currency:'',
      test:''

    }
    Navigation.events().bindComponent(this)
  }

  onLogin=()=>{
    const  url="http://192.168.0.23:8001/login"
    const  config={method:"POST",headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body:JSON.stringify({

      user_name:this.state.username,
      user_password:this.state.password
    })
    }

    fetch(url,config).then((response)=>response.text())
      .then((json)=>{
        const jsonResponse=json.length ? JSON.parse(json) : {};
        this.setState({response:jsonResponse})
        //Alert.alert(this.state.response.toString())

        Object.entries(this.state.response).map( async ([k, v]) => {
          if (k === "currency") {
            try {
              AsyncStorage.setItem("currency", v)
            } catch (e) {

            }
          } else if (k === "name") {
            try {
              AsyncStorage.setItem("name", v)
            } catch (e) {

            }
          } else if (k === "response") {
            if (v === "OK") {
              try {
                await AsyncStorage.setItem("user_name", this.state.username)
                await AsyncStorage.setItem("password",this.state.password)
                Navigation.setRoot(
                  {
                    root: {
                          stack: {
                            id: "mainscreen",
                            children: [
                              {
                                component: {
                                  name: "Contact",
                                  options: {

                                    topBar: {
                                      visible:false
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                )

              } catch (e) {
                Alert.alert(e.toString())
              }
            } else {
              Alert.alert('no response')
            }

          }

        })





      }).catch((error)=>{
        console.log(error)
    })

  }

  goHome=()=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:'Home',

      }
    })
  }


  goRegistration=()=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:'Registration',
        options:{
          topBar:{
            visible:false
          }
        }
      }
    })
  }




  render() {
    return (
      <View style={{alignItems:"center",flex:1,backgroundColor:"#FFFFF0"}}>
        <View style={{alignSelf:"center",width:"100%",height:"10%",marginTop:"30%"}}>
          <TextInput onChangeText={(text)=>{this.setState({username:text})}}  placeholder="User Name...." style={{elevation:2,borderRadius:10,width:"85%",height:"90%",margin:10,alignSelf:"center",backgroundColor:"white"}}/>
        </View>
        <View style={{alignSelf:"center",width:"100%",height:"10%",margin:"5%"}}>
          <TextInput  onChangeText={(text)=>{this.setState({password:text})}} placeholder="Password...." style={{elevation:2,borderRadius:10,width:"85%",height:"90%",margin:10,alignSelf:"center",backgroundColor:"white"}}/>
        </View>
        <View style={{elevation:2,borderRadius:10,backgroundColor:"#c71585",alignSelf:"center",width:"50%",height:"8%",margin:"5%",alignItems:"center",justifyContent:"center"}}>
              <Text onPress={this.onLogin}  style={{fontSize:25,color:"white"}}>LOGIN</Text>
        </View>
        <View>
              <Text  onPress={()=>{this.goRegistration()}} style={{fontSize:15,color:"blue"}}>{this.state.name_}</Text>
              <Text  onPress={()=>{this.goRegistration()}} style={{fontSize:15,color:"blue"}}>{this.state.currency}</Text>
              <Text  onPress={()=>{this.goRegistration()}} style={{fontSize:15,color:"blue"}}>{this.state.test}</Text>
        </View>
      </View>
    );
  }
}

export default Login;
