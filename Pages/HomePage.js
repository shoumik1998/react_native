import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert, Button,
  FlatList,
  Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Modal, SafeAreaView,
  Text, TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Navigation } from "react-native-navigation";
import { FloatingMenu } from "react-native-floating-action-menu";
import { color } from "native-base/lib/typescript/theme/styled-system";


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


  fetch_all = async (product_name) => {
    if (product_name != null) {
      url = "http://192.168.0.23:8001/fetching_pro_by_name_specific_region";
    } else {
      url = "http://192.168.0.23:8001/fetch_pro_after_location_search";
    }

    const config = {
      method: "POST", headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: this.props.region,
        country: this.props.country,
        district: this.props.district,
        subdistrict: this.props.subdistrict,
        product_name: product_name,
      }),
    };

    fetch(url, config).then((response) => response.text())
      .then((json) => {
        this.setState({ isLoading: false });
        const jsonResponse = json.length ? JSON.parse(json) : {};
        this.setState({ all_data: this.state.all_data.concat(jsonResponse) });

      }).catch(error => {
      console.log(error);
    });
  };

   child = ({ name,description,  price, imagepath,currency }) => {
    return (
      <View style={{
        shadowRadius: 10,
        elevation: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "white",
        shadowOpacity: 2,
        width: 160,
        height: 200,
      }}>
        <View style={{ margin: 10, alignSelf: "center" }}>
          <Text style={{color: "red"}} onPress={() => Alert.alert("hmmm")}>{name}</Text>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image style={{ width: 100, height: 100 }} source={{ uri: imagepath }} />
        </View>

        <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
          <Text style={{color: "blue", fontSize:12}}>{description}</Text>
        </View>

        <View style={{ marginTop: "auto", padding: "5%", alignItems: "center" }}>
          <Text>{price +" "+ currency }</Text>
        </View>

      </View>
    );
  };

  go_details = (name) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Details",
        passProps: {
          imagepath: name,
        },
      },
    });
  };

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
              <TextInput editable={this.state.editable} ref={input => this.textInput = input} onChangeText={(text) => {
                this.fetch_all(text) + this.setState({ product_name: text });
              }} placeholder="search" style={{ width: "80%", height: "100%" }} />
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
              this.go_details(item.imagepath);
            }} onLongPress={() => this.modal()}>
              <this.child description={item.description} name={item.name} imagepath={item.imagepath} price={item.price} currency={item.currency} />
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
