import React, { Component } from "react";
import { Alert, Button, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Rand extends Component {




constructor(props) {
  super(props);
  Navigation.events().bindComponent(this)
  this.state={
    name:''
  }
}

getV=async ()=>{
  try {
    return await AsyncStorage.getItem("user_name")
  }catch (e) {

  }
}

// componentDidMount () {
//
//   try {
//      AsyncStorage.setItem("user_name","Shoumik")
//     un=this.getV()
//     this.setState({name: un})
//   }catch (e) {
//
//   }
//
// }

  goAbout=async ()=>{
  try {
    await AsyncStorage.setItem("u",'Ahammed...')
    Alert.alert('stored')
  }catch (e) {
          this.setState({name:e.toString()})
  }




}
goModal=async () => {
  try {
    var name_=await  AsyncStorage.getItem("user_name")
    this.setState({name:name_})

  } catch (e) {

  }
}
gosettings=async ()=>{
  try {
    await  AsyncStorage.setItem("user_name",'')
    await  AsyncStorage.setItem("password",'')
    Navigation.setRoot({
      root:{
        stack:{
          children:[
            {
              component:{
                name:'Login',
                options:{
                  topBar:{
                    visible:false
                  }
                }
              }
            }
          ]
        }
      }
    })

  }catch (e) {
    Alert.alert(e.toString())
  }

}
goContact=()=>{
  Navigation.push(this.props.componentId, {
    component:{
      name:'Login',
      options:{
        topBar:{
          visible:false
        },
        // animations:{
        //   push:{
        //     content:{
        //       translationX:{
        //         from: require('react-native').Dimensions.get('window').width,
        //         to :0, duration:300,
        //         startDelay:1
        //
        //       }
        //     }
        //   },
        //   pop:{
        //     content:{
        //       translationX:{
        //         from:0,
        //         to: require('react-native').Dimensions.get('window').width,
        //         duration:300
        //       }
        //     }
        //   }
        // }
      }
    }
    }
  )
}



  render() {
    return (
      <View>
        <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:36}}>Home page</Text>
        </View>
        <View style={{margin:10}}>
          <Button title='Modal' onPress={this.goModal}/>
        </View>
        <View style={{margin:10}}>
          <Button title='Settings' onPress={this.gosettings}/>
        </View>
        <View style={{margin:10}}>
          <Button title='About' onPress={this.goAbout}/>
        </View>
        <View style={{margin:10}}>
          <Button title='Contact' onPress={this.goContact}/>
          <Text>{this.state.name}</Text>
        </View>
      </View>
    );
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'button') {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }
}

export default Rand;
