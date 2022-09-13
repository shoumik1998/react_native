import React, { Component } from 'react';
import { Button, Center, Flex, NativeBaseProvider, Toast, Modal, VStack, HStack, FlatList } from "native-base";
import {
    ActivityIndicator, Alert, Image, Text, View, StyleSheet,
    Dimensions, TouchableHighlight, TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";
import NumericButton from "../Components/NumericButton";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderedProductChild from '../Components/OrderedProductChild';
import Transition from '../Transition/Transition';
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
  } from '@pusher/pusher-websocket-react-native';


export default class OrderedProducts extends Component {

    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
        this.state = {
            all_data: [],
            phn_email: ""
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
            var phn_email = await AsyncStorage.getItem("phn_gmail")
            this.setState({ phn_email: phn_email })
        } catch (error) {

        }
        this.onFetch()

        const pusher = Pusher.getInstance();

await pusher.init({
apiKey: "f4294e0ad72b1a26ebb2",
cluster: "ap2"
})

await pusher.connect();
await pusher.subscribe({
channelName: phn_email, 
onEvent: async (event) => {
    console.log(event.data)
    this.setState({all_data:[]})
    this.onFetch()
} 
});

    }

    onFetch = async () => {
        var response = await Shop_API.onOrderedProducts(this.props.props)
        this.setState({ all_data: response })

    }


    render() {

        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height

        if (this.state.phn_email == "") {
            return (
                <View style={{ justifyContent: 'center', width: screenWidth, height: screenHeight }}>
                    <Text style={{ color: 'red', alignSelf: 'center' }}>
                        You are not  logged in. please login first and you wil be able to
                        see your ordered products or history.
                    </Text>
                </View>
            )

        } else {
            return (
                <NativeBaseProvider >
                    <View style={{ width: "100%", height: '100%', flex: 20 }}>
                        <View style={styles.textViewStyles} >
                            {this.props.props===1 ? 
                             <Text style={styles.textStyles}>Your Orders</Text> :
                             <Text style={styles.textStyles}>History</Text>
                             }
                           
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


