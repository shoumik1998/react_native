import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

class Search extends Component {
  render() {
    return (
      <View style={{justifyContent:'center'}}>
        <TextInput placeholder='search' style={{width:'100%',height:80}}/>
        {/*<Text style={{width:20, height:20}}>title</Text>*/}


      </View>
    );
  }
}

export default Search;
