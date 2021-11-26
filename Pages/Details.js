import React, { Component } from "react";
import { Image, Text, View } from "react-native";

class Details extends Component {
  render() {
    return (
      <View>
        <Image style={{width:"90%", height:"90%"}} source={{uri:this.props.imagepath}}/>
      </View>
    );
  }
}

export default Details;
