import React, { Component } from 'react';
import { Button, Center, Flex, NativeBaseProvider, Toast, Modal, VStack, HStack, FlatList } from "native-base";
import { ActivityIndicator, Alert, Image, Text, View, StyleSheet,
     Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import NumericButton from "../Components/NumericButton";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderedProductChild from '../Components/OrderedProductChild';
import Transition from '../Transition/Transition';


export default class OrderedProducts extends Component {

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            all_data: [],
            phn_email:""
        }

    }

    go = (component_name, props, status_code, component_id) => {
        Navigation.push(component_id, {
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
                    status_code: status_code
                },

            },

        })
    }

    async componentDidMount() {

        try {
           var  phn_email=await AsyncStorage.getItem("phn_gmail")
           this.setState({phn_email:phn_email})
        } catch (error) {

        }
        this.onFetch()
    }

    onFetch = async () => {
        var response = await Shop_API.onOrderedProducts(1)
        this.setState({ all_data: response })

    }


     render() {

        const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

         

         if (this.state.phn_email=="") {
        return (
            <View style={{ justifyContent: 'center',width:screenWidth,height:screenHeight }}>
                <Text style={{ color: 'red', alignSelf:'center' }}>
                    You are not  logged in. please login first and you wil be able to
                    see your ordered products.
                </Text>
            </View>
        )

          }else{
            return (
          <NativeBaseProvider >
              <View style={{width:"100%",height:'100%',flex:20}}>
                  <View style={styles.textViewStyles} >
                  <Text style={styles.textStyles}>Your Orders</Text>
              </View>
              <View>

              {
                            this.state.all_data.length <= 0 &&
                            <View style={{
                                justifyContent: "center", alignItems: "center",
                                top: 0, bottom: 0, left: 0, right: 0
                                , position: 'absolute'
                            }}>
                                <ActivityIndicator style={{ alignSelf: 'center', position: 'absolute' }} size={'large'} />
                            </View>

                        }
                        <View >
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2} data={this.state.all_data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.go("Details", item, 1, "h_screen")
                                        }}
                                        onLongPress={() => { Alert.alert("long presing") }}
                                    >
                                        <OrderedProductChild data={item} />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>


                    </View>
              </View>



        </NativeBaseProvider>
        )  
    }



    
}
}


const styles = StyleSheet.create({
    rootView: {

    },

    textViewStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%'
    },
    textStyles: {
        color: 'red',
        fontSize: 20
    }
})


