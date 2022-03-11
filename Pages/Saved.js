import React, {Component} from 'react'
import realm from '../API/Realm'
import {
    ActivityIndicator,
    Alert, Button,
    FlatList,
    Image, SafeAreaView,
    Text,TextInput,
    TouchableHighlight,
    TouchableOpacity,
    
    View,
  } from "react-native";
  import Product_child from '../Components/Product_card';
  import Transition from '../Transition/Transition';


  class Saved extends Component{
      render(){
          const saved_data=realm.objects("Saved")
          return(
              <View>
                  <Text>saved page</Text>
                  <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={this.loarmore}
            ListFooterComponent={this.renderFooter}
            style={{ alignSelf: "center" }} numColumns={2} data={saved_data} renderItem={({ item }) => (
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
              </View>


          );
      }
  }

  export default Saved;