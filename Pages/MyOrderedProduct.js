import React, { Component } from 'react';
import { Button, Center, Flex, NativeBaseProvider, Toast,Modal,VStack,HStack, FlatList } from "native-base";
import { Alert, Image, Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import NumericButton from "../Components/NumericButton";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderedProductChild from '../Components/OrderedProductChild';
import Transition from '../Transition/Transition';


export default class OrderedProducts extends Component {

    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
        this.state={
            all_data:[]
        }

    }

   go=(component_name,props,status_code,component_id)=>{
    Navigation.push(component_id,{
        component: {
            name: component_name,
            options: {
                sideMenu: {
                    left: {
                        visible: false
                    }
                },
                topBar: {
                    visible: false
                }
            },
            passProps: {
                prop: props,
                status_code:status_code
            },

        },
        
    })
   }

   async componentDidMount(){
        this.onFetch()
    }

     onFetch=async()=>{
         var response=await Shop_API.onOrderedProducts(1)
         this.setState({all_data:response})

    }


  render() {
    return (
      <NativeBaseProvider>
          <View style={styles.textViewStyles} >
              <Text style={styles.textStyles}>Your Orders</Text>
          </View>
          <View>
              <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} data={this.state.all_data}
          renderItem={({item})=>(
              <TouchableOpacity
              onPress={()=>{
                this.go("Details",item,1,"h_screen")
              }}
              onLongPress={()=>{Alert.alert("long presing")}}
              >
                  <OrderedProductChild data={item}/>
              </TouchableOpacity>
          )}
          />
          </View>

          
      </NativeBaseProvider>
    );
  }
}


const styles=StyleSheet.create({
    rootView:{

    },

    textViewStyles:{
        alignItems:'center',
        justifyContent:'center',
        margin:'2%'
    },
    textStyles:{
        color:'red',
        fontSize:20
    }
})


