import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Product_child from "../Components/Product_card";
import Shop_API from "../API/Shop_API";
import Transition from "../Transition/Transition";
import { Navigation } from "react-native-navigation";


class AShop extends Component {

  constructor() {
    super();
    this.state={
      all_data : []
    }
  }

  go = (name) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Details",
        passProps: {
          imagepath: name,
        },
      },
    });
  };

  componentDidMount(){
    this.fetch_ashop()
  }

  go=(imagepath)=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:"Details",
        passProps:{
          imagepath:imagepath
        },
        options:{
          topBar:{
            visible:false
          }
        }
      }
    })
  }



  fetch_ashop= async ()=>{

    const single_shop_data= await Shop_API.single_shop_data(this.props.prop)

    this.setState({all_data: single_shop_data})


    



    // const  URL="http://192.168.0.17:8001/data_fetching"

    // const  config={method: "POST" , headers :{
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   Body: JSON.stringify({
    //     user_name:"Mizan@1999"
    //   })

    // }

    // fetch(URL,config).then((response)=>response.text())
    //   .then((json)=>{
    //     const  json_response=json.length ? JSON.parse(json) :{}
    //     this.setState({all_data: this.state.all_data.concat(json_response)})
    //   })
  }



  render() {
    
    return (
      
      <View>
        <View>
          <Text>{}</Text>
        </View>
        <View>

       
       
        
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
          }}>
            <Product_child data={item}/>
          </TouchableOpacity>

        )} />

        </View>

      </View>
    );
  }
}

export default AShop;
