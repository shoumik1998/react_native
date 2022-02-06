import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Alert, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Navigation, Options,NavigationComponent } from "react-native-navigation";
import Shop_API from './API/Shop_API';
import Transition from "./Pages/Transition/Transition";



class Contact extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this)
    this.state={
      visibility:true,
      visible:'yes',
      data:[

      ]
    }

  }

  fetchData= async (text)=>{

    const location_response= await Shop_API.onLocation_FetchingAPI(text)

    this.setState({data : location_response})



  }

  push=(country,district, subdistrict, region)=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:'Home',
        passProps:{
          country:country,
          district: district,
          subdistrict: subdistrict,
          region: region
        },
        options:{

          topBar:{
            visible:false
          }
        }
      }
    })
  }

   
      


  save_location_info= async (country,district,subdistrict,region)=>{
    try {
      await AsyncStorage.setItem("country",country)
      await AsyncStorage.setItem("district",district)
      await AsyncStorage.setItem("subdistrict",subdistrict)
      await AsyncStorage.setItem("region",region)
      Transition.Set_Root("Home")
    } catch (error) {
      Alert.alert(error)
    }
  }

  childview=({country,district, subdistrict, region})=>{
    return(
      <View style={{margin:"1%" ,borderRadius:10, backgroundColor:'white', elevation: 5}} >
        <View>
          <Text style={{color:'red',padding:5}}>{country}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{district}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{subdistrict}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{region}</Text>
        </View>
      </View>
    )
  }


  render() {
    return (
      <View style={{flex:1,justifyContent:'flex-start'}}>
        <View  style={{margin:7 , padding:10}}>
          <TextInput onChangeText={(text)=>{this.fetchData(text)}}  enablesReturnKeyAutomatically={true} focusable={true} autoFocus={true} showSoftInputOnFocus={true}
                      placeholder='search'  style={{width:'100%', height:50,borderWidth:2,borderRadius:5}}/>
        </View>
        <View>
          <FlatList

            style={{margin:10}} data={this.state.data}
            renderItem={({item})=>(
              <TouchableOpacity  onPress={()=>this.push(item.country,item.district,item.subdistrict,item.region) +
              this.save_location_info(item.country,item.district,item.subdistrict,item.region)}>
                <this.childview country={item.country} district={item.district} subdistrict={item.subdistrict} region={item.region}/>
              </TouchableOpacity>


            )}/>
        </View>
      </View>
    );
  }

}

export default Contact;
