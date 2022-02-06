import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";
import Circle from "../Components/round";


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
