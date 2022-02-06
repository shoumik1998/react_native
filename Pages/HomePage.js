import React, { Component } from "react";

import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Modal, SafeAreaView,
  Text,TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { FloatingMenu } from "react-native-floating-action-menu";
import { color } from "native-base/lib/typescript/theme/styled-system";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  Product_child   from "../Components/Product_card";
import Transition from "./Transition/Transition";


class HomePage extends Component {



  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      all_data: [],
      status_search: "flex",
      status_close: "none",
      editable: false,
      product_name: "",
      currentPage: 1,
      isLoading: true,
      refresh_status: "none",
      menuOpen: false,
      change_text:""

    };

  }




  refresh_button = () => {
    return (
      <TouchableOpacity style={{
        borderWidth: 3,
        alignSelf: "center",
        marginBottom: 4,
        borderRadius: 7,
        borderColor: "red",
        display: this.state.refresh_status,
        width: "95%",
        height: "8%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }} onPress={() => {
        this.setState({ all_data: [], refresh_status: "none" });
        this.fetch_all();
      }
      }>
        <View>
          <Text style={{ alignSelf: "center", fontSize: 18, color: "red" }} onPress={() => {

          }}>{"Load More"}</Text>
        </View>
      </TouchableOpacity>

    );
  };

  loarmore = () => {
    if (Object.keys(this.state.all_data).length > 20) {

      this.setState({ refresh_status: "flex" });
    } else {
      this.setState({ isLoading: true, currentPage: this.state.currentPage + 1 }, this.fetch_all);
    }


  };


  componentDidMount() {
    this.fetch_all();
  }


   async fetch_all(product_name) {
     
    try {
      var country = await AsyncStorage.getItem("country")
      var district = await AsyncStorage.getItem("district")
      var subdistrict = await AsyncStorage.getItem("subdistrict")
      var region = await AsyncStorage.getItem("region")
    } catch (error) {

    }

    const response_fetch_all = await Shop_API.onFetch_After_Location_SearchAPI(region,
      country, district, subdistrict, product_name)

    this.setState({ all_data: this.state.all_data.concat(response_fetch_all) })


    
  };

  

  go = (path) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Details",
        passProps: {
          imagepath: path,
        },
        options:{
          topBar:{
            visible:false
          }
        }
      },
    });
  };

  aler=async()=>{
    this.fetch_all()
    
  }

  renderFooter = () => {
    return (
      this.state.isLoading ?
        <View style={{ elevation: 6, alignItems: "center", margin: 10 }}>
          <ActivityIndicator color="red" size="large" />
        </View> : null
    );
  };

  modal = () => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
      }}>
        <Modal
          visible={true}
        >
          <View>
            <Text>"hey there"</Text>
          </View>
        </Modal>
      </View>

    );
  };


  render() {
    return (
      <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 100, justifyContent: "flex-start" }}>
        
        <SafeAreaView style={{
          flex: 10,
          elevation: 6,
          backgroundColor: "white",
          margin: "2%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "flex-end",
        }}>
          <TouchableWithoutFeedback onPress={() => {
            this.textInput.focus() + this.setState({ status_search: "none", status_close: "flex", editable: true });
          }}>
            <Image style={{ margin: "2%", width: "8%", height: "50%", display: this.state.status_search }}
              source={require("../Pages/searchicon.png")} />
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", display: this.state.status_close, justifyContent: "center" }}>
            <TouchableWithoutFeedback onPress={() => {
              Alert.alert("kuyg");
            }}>
               <TextInput onChange={async()=>{}} editable={this.state.editable} ref={input => this.textInput = input} 
              onChangeText={async(text)=> {this.fetch_all }} placeholder="search" style={{ width: "80%", height: "100%" }} /> 
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
              this.textInput.clear() + this.fetch_all() + this.setState({
                status_search: "flex",
                status_close: "none",
                editable: false,
              });
            }}>
              <Image style={{ margin: "2%", width: "8%", height: "50%", display: this.state.status_close }}
                source={require("../Pages/close_icon.png")} />
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>

        <View style={{ flex: 90 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={this.loarmore}
            ListFooterComponent={this.renderFooter}
            style={{ alignSelf: "center" }} numColumns={2} data={this.state.all_data} renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                  this.go(item.imagepath)
                  //Transition.Go("Details",item.imagepath,this.props.componentId)
              }} onLongPress={() => this.modal()}>
                {/* <this.child description={item.description} name={item.name} imagepath={item.imagepath} price={item.price} currency={item.currency} /> */}
                <Product_child data={item} />
              </TouchableOpacity>

            )} />
          <this.refresh_button />
        </View>
        <View>
          <FloatingMenu items={[{ label: "hey", image: require("./menuicon.png") },
          { label: "there" },
          ]}
            isOpen={this.state.menuOpen} onMenuToggle={() => {
              if (this.state.menuOpen === true) {
                this.setState({ menuOpen: false });
              } else {
                this.setState({ menuOpen: true });
              }

            }}
            onItemPress={(item, index) => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: "Contact",
                  options: {
                    topBar: {
                      visible: false,
                    },
                    animations: {
                      push: {
                        content: {
                          translationX: {
                            from: require("react-native").Dimensions.get("window").width,
                            to: 0, duration: 250,


                          },
                        },
                      },
                      pop: {
                        content: {
                          translationX: {
                            from: 0,
                            to: require("react-native").Dimensions.get("window").width,
                            duration: 250,
                          },
                        },
                      },
                    },
                  },
                },
              });
            }}
          />
        </View>


      </KeyboardAvoidingView>
    );
  }


}

export default HomePage;
