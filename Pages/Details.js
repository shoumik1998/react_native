import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import {HomePage,child} from "./HomePage";

class Details extends Component {
  v=new HomePage();

  child();
  render() {
    return (
      <View>
        <Image style={{width:"90%", height:"90%"}} source={{uri:this.props.imagepath}}/>
      </View>
    );
  }
}

export default Details;
