import React from "react"
import { View } from "react-native"

const Circle=({style_add})=>{
    return(
        <View style={[{borderColor:"green",borderWidth:2,backgroundColor:"green"},style_add]}>

        </View>
    )
}

export default Circle;
