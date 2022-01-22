import React, { Component } from "react";
import { Alert, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Navigation, Options,NavigationComponent } from "react-native-navigation";



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

  fetchData=(text)=>{

      const url='http://192.168.0.23:8001/lf';
      const config={method:'POST', headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          region:text
        })
      }
      fetch(url,config).then((result)=>  result.text()
      )
        .then((response)=>{
          const  responseJson=response.length ? JSON.parse(response) : {};
            this.setState({ data: responseJson });

        })
        .catch((error)=>{
          console.error(error)
        })
  }

  push=(country,district, subdistrict, region)=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:'Settings',
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

  childview=({country,district, subdistrict, region})=>{
    return(
      <View style={{margin:"1%" ,borderRadius:10, backgroundColor:'gray'}} >
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
              <TouchableOpacity  onPress={()=>this.push(item.country,item.district,item.subdistrict,item.region)}>
                <this.childview country={item.country} district={item.district} subdistrict={item.subdistrict} region={item.region}/>
              </TouchableOpacity>


            )}/>
        </View>
      </View>
    );
  }

}

export default Contact;
