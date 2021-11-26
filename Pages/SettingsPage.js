import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, SafeAreaView,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Navigation } from "react-native-navigation";



class SettingsPage extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this)
    this.state = {
      all_data: [],
      status_search: 'flex',
      status_close: 'none',
      editable: false,
      product_name: '',
      currentPage: 1,
      isLoading: true,
      refresh_status:'none'

    }

  }

  refresh_button = () => {
    return (
      <View style={{margin:10,display:this.state.refresh_status,width:"100%",height:"5%", alignItems:'center'}}>
        <Button title={"Load More"} onPress={() => {
          this.setState({all_data:[],refresh_status:'none'})
        this.fetch_all()



        }} />
      </View>
    )
  }

  loarmore = () => {
    if (Object.keys(this.state.all_data).length > 200) {

      this.setState({refresh_status:'flex'})
    } else {
      this.setState({ isLoading: true, currentPage: this.state.currentPage + 1 }, this.fetch_all);
    }


  }


  componentDidMount() {
    this.fetch_all()
  }


  fetch_all = async (product_name) => {
    if (product_name != null) {
      url = "http://192.168.100.22:8088/fetching_pro_by_name_specific_region";
    } else {
      url = 'http://192.168.100.22:8088/fetch_pro_after_location_search';
    }

    const config = {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        region: this.props.region,
        country: this.props.country,
        district: this.props.district,
        subdistrict: this.props.subdistrict,
        product_name: product_name
      })


    }

    fetch(url, config).then((response) => response.text())
      .then((json) => {
        this.setState({ isLoading: false })
        const jsonResponse = json.length ? JSON.parse(json) : {};
        this.setState({ all_data: this.state.all_data.concat(jsonResponse) })

      }).catch(error => {
      console.log(error)
    })
  }

  child = ({ name, price, imagepath }) => {
    return (
      <View style={{
        elevation: 40,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "white",
        shadowOffset: 10,
        width: 160,
        height: 200
      }}>
        <View style={{ margin: 10, alignSelf: "center" }}>
          <Text onPress={() => Alert.alert('hmmm')}>{name}</Text>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image style={{ width: 100, height: 100 }} source={{ uri: imagepath }} />
        </View>

        <View style={{ marginTop: 'auto', padding: "5%", alignItems: "center" }}>
          <Text>{price}</Text>
        </View>

      </View>
    )
  }

  go_details = (name) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'Details',
        passProps: {
          imagepath: name
        }
      }
    })
  }

  renderFooter = () => {
    return (
      this.state.isLoading ?
        <View style={{ alignItems: "center", margin: 10 }}>
          <ActivityIndicator color='red' size='large' />
        </View> : null
    )
  }


  render() {
    return (
      <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 100, justifyContent: 'flex-start' }}>
        <SafeAreaView style={{
          flex: 10,
          elevation: 20,
          backgroundColor: "white",
          margin: "2%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "flex-end"
        }}>
          <TouchableWithoutFeedback onPress={() => {
            this.textInput.focus() + this.setState({ status_search: 'none', status_close: 'flex', editable: true })
          }}>
            <Image style={{ margin: "2%", width: "8%", height: "50%", display: this.state.status_search }}
                   source={require('../Pages/searchicon.png')} />
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row', display: this.state.status_close, justifyContent: 'center' }}>
            <TouchableWithoutFeedback onPress={() => {
              Alert.alert('kuyg')
            }}>
              <TextInput editable={this.state.editable} ref={input => this.textInput = input} onChangeText={(text) => {
                this.fetch_all(text) + this.setState({ product_name: text })
              }} placeholder='search' style={{ width: "80%", height: '100%' }} />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {
              this.textInput.clear() + this.fetch_all() + this.setState({
                status_search: 'flex',
                status_close: 'none',
                editable: false
              })
            }}>
              <Image style={{ margin: "2%", width: "8%", height: "50%", display: this.state.status_close }}
                     source={require('../Pages/close_icon.png')} />
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>

        <View style={{ flex: 90 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={this.loarmore}
            ListFooterComponent={this.renderFooter}
            style={{ alignSelf: "center" }} numColumns={2} data={this.state.all_data} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              this.go_details(item.imagepath)
            }} onLongPress={() => Alert.alert('hmmm')}>
              <this.child name={item.name} imagepath={item.imagepath} price={item.price} />
            </TouchableOpacity>

          )} />
        </View>
        <this.refresh_button />

      </KeyboardAvoidingView>
    );
  }




}

export default SettingsPage;
