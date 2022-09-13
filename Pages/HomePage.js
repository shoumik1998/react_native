import React, { Component, useState } from "react";
import { useToast, NativeBaseProvider } from "native-base";

import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Modal, SafeAreaView,
  Text,TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithFeedback,
  View,
  Dimensions
} from "react-native";
import { Navigation } from "react-native-navigation";
import { color } from "native-base/lib/typescript/theme/styled-system";
import Shop_API from "../API/Shop_API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  Product_child   from "../Components/Product_card";

import CustomDialog from '../Components/CustomDialog'

import toast from "../Components/Toast";
import Example from "../Components/Toast";
import Transition from "../Transition/Transition";
import { FloatingMenu } from "react-native-floating-action-menu";




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
      search_keyword:'',
      modal_view:0,
     selected_data:{}

    };

  }

   toas=()=>{
const toastt=useToast();
toastt.show({description:"heuuu"})
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
        this.fetch_all(this.state.search_keyword);
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
      this.setState({ isLoading: true, currentPage: this.state.currentPage + 1 }, () => {
        this.fetch_all(this.state.search_keyword)
      }
      );
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
        console.log(response_fetch_all)
       
      
    
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
          <ActivityIndicator animating={true} color="green" size="large" />
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
    const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height

    return (
      <NativeBaseProvider>
        <View style={{flexDirection:'row',flex: 10, width:screenWidth, height:screenHeight
          }}>
          <TouchableOpacity onPress={()=>{
            Navigation.mergeOptions(this.props.componentId, {
              sideMenu: {
                left: {
                  visible: true,
                },
              },
            });

          }} style={{flex:2,width:'100%',height:"80%",margin:"2%",marginBottom:"20%"}}>
            <Image style={{width:"100%",height:"100%",resizeMode:'contain'}}  source={require("../Assets/menu_512.png")}/>
          </TouchableOpacity>

<SafeAreaView style={{
          flex: 10,
          elevation: 6,
          backgroundColor: "white",
          margin: "2%",
          borderRadius: 10,
          marginStart:"0%",
          justifyContent: "center",
          alignItems: "flex-end",
         }}>

          {
            this.state.modal_view>0 && <CustomDialog modal_visible_status={this.state.modal_view} data={this.state.selected_data} /> 
          }
          
          <TouchableWithoutFeedback onPress={() => {
            this.textInput.focus() + this.setState({ status_search: "none", status_close: "flex", editable: true });
          
          }}>
            <Image style={{ margin: "2%", width: "12%", height: "50%", display: this.state.status_search }}
              source={require("../Pages/searchicon.png")} />
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", display: this.state.status_close, justifyContent: "center" }}>
            <TouchableWithoutFeedback onPress={() => {
              this.textInput.focus() 
             
            }}>
               <TextInput onChange={async()=>{}} editable={true} ref={input => this.textInput = input} 
              onChangeText={(text)=> {
                this.setState({all_data:[]})
                 this.fetch_all(text) 
                  this.setState({search_keyword:text},()=>{
                    this.loarmore.bind(this)
                  }                   
                  )

                
              }
            } 
              placeholder="search..." style={{ width: "80%", height: "100%" }} /> 
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
        </View>
        

        <View style={{ flex: 90 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={this.loarmore}
            ListFooterComponent={this.renderFooter}
            style={{ alignSelf: "center" }} numColumns={2} data={this.state.all_data} 
            renderItem={({ item }) => (
              <TouchableOpacity
            
               onPress={() => {
                 Transition.Go("Details",item,"h_screen")
                 
                  
              }} 
              onLongPress={() => {
                this.setState({selected_data:item})
                this.setState({modal_view:this.state.modal_view+1})
               }}
              >
                <Product_child data={item} />
              </TouchableOpacity>

            )} />
          <this.refresh_button />
        </View>
        <View>
          {/* <FloatingMenu
          borderColor="blue"
            primaryColor="blue"
            items={[
              { label: "Saved" },
              { label: "Orders" },
              { label: "Log In" },
              { label: "Search Shop" },
              { label: "Search Region" },
              { label: "History" },
          
          
          ]}
          renderItemIcon={
            (item,index,menuState)=>{
              if (index===0) {
                return(

                  <Image style={{width:"120%",height:"120%"}} source={require("../Assets/history.png")}/>
                )  
              }else if (index===1) {
                return(
                  <Image style={{ width: "120%", height: "120%" }} source={require("./Assets/map.png")} />
                )  
              }else if (index===1) {
                return(
                  <Image style={{width:"100%",height:"100%"}} source={require("./Assets/map.png")}/>

                )
              }
              else if (index===2) {
                return(

                  <Image style={{ width: "100%", height: "100%" }} source={require("./Assets/search.png")} />

                )
              }
              else if (index===3) {
                return(

                 <Image style={{ width: "100%", height: "100%" }} source={require("./Assets/login.png")} />

                )
              }
              else if (index===4) {
                return(

                  <Image style={{ width: "100%", height: "100%" }} source={require("./Assets/shopping-cart.png")} />

                )
              }
              else if (index===5) {
                return(

                  <Image style={{ width: "100%", height: "100%" }} source={require("./Assets/download.png")} />

                )
              }

            }
          }
            isOpen={this.state.menuOpen}
             onMenuToggle={() => {
              if (this.state.menuOpen === true) {
                this.setState({ menuOpen: false });
              } else {
                this.setState({ menuOpen: true });
              }

            }}
            onItemPress={(item, index) => {
              if (index===0) {
                Alert.alert(index.toString())
              }else if(index===1){
                Alert.alert(index.toString())
              }
              
            }}
          /> */}
        </View>


     
      </NativeBaseProvider>
    );
  }


}

export default HomePage;
