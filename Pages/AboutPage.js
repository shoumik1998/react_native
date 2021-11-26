import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";
class AboutPage extends Component {

  goSettings(){
    Navigation.push('mainscreen',{
      component:{
        name:'Settings',
        options:{
          sideMenu:{
            left:{
              visible:false
            }
          }
        }
      }
    })
  }


  render() {
    return (
      <View style={{ flex:100, backgroundColor:'white',justifyContent:'center', marginRight:20}}>
       <View style={{flex:30}}>
         <Image nativeID='imageID' style={{width:'100%',height:'100%'}} source={{uri:'https://cdn.pixabay.com/photo/2021/10/18/19/19/bird-6721895__340.jpg'}}/>
       </View>

        <View style={{flex:70,backgroundColor:'white',justifyContent:'center'}}>
       <View>
         <Text nativeID='textID' onPress={this.goSettings} style={{margin:8, fontSize:25, color:'red'}} >Settings</Text>
       </View>
       <View>
         <Text style={{margin:8, fontSize:25, color:'red'}} >About page</Text>
       </View>
       <View>
         <Text style={{margin:8, fontSize:25, color:'red'}}>About page</Text>
       </View>
       <View>
         <Text style={{margin:8, fontSize:25, color:'red'}}>About page</Text>
       </View>

        </View>
      </View>
    );
  }
}

export default AboutPage;
