import React from "react"
import { View } from "react-native"

const Circle=({style_add})=>{
    return(
        <View style={[{width:8,height:8,borderRadius:5,borderColor:"green",borderWidth:2,backgroundColor:"green"},style_add]}>

        </View>
    )
}

export default Circle;
