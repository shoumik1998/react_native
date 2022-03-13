import React, { Component } from 'react'
import realm from '../API/Realm'
import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, SafeAreaView,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,

  View,
} from "react-native";
import Product_child from '../Components/Product_card';
import Transition from '../Transition/Transition';



class Saved extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selected_id: [],
      refresh:false
    }


  }

  deleteSaved=()=>{
    realm.write(() => {
      for (let id of this.state.selected_id) {
        realm.delete(realm.objects("Saved").filtered(`id='${id}'`))
        this.setState({refresh:!this.state.refresh})
        
      }




    })

  }

  getSelected = (item) => this.state.selected_id.includes(item.id)


  render() {
    const saved_data = realm.objects("Saved")
    return (
      <View>
        {
          this.state.selected_id.length>0 && <View style={{ width: 50, height: 50, elevation: 10, alignSelf: "flex-end" }}>
            <TouchableOpacity onPress={()=>{
              this.deleteSaved();
              
            }}>
              <Image style={{ width: "100%", height: "100%", tintColor: "red" }} source={require('../Assets/delete.png')} />
            </TouchableOpacity>
          
        </View>
        }
        
        <View>
          <FlatList
          extraData={!this.state.refresh}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={this.loarmore}
            ListFooterComponent={this.renderFooter}
            style={{ alignSelf: "center" }} numColumns={2} data={saved_data} renderItem={({ item }) => (
              <TouchableOpacity

                onPress={() => {
                  if (this.state.selected_id.length > 0) {
                    if (this.state.selected_id.includes(item.id)) {
                      const newSelected_id = this.state.selected_id.filter((newId) => newId !== item.id)

                      this.setState({ selected_id: [...newSelected_id] })
                      console.log(...this.state.selected_id)
                    } else {
                      this.setState({ selected_id: [...this.state.selected_id, item.id] })



                      console.log(...this.state.selected_id)
                    }

                  } else {

                    Transition.Go("Details", item, "h_screen")
                  }
                }}
                onLongPress={() => {
                  this.setState({ selected_id: [...this.state.selected_id, item.id] })
                  console.log(...this.state.selected_id)



                }}
              >
                <Product_child selected_id={this.getSelected(item)} data={item} />
              </TouchableOpacity>

            )} />
        </View>


      </View>


    );
  }
}

export default Saved;