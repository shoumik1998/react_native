import React from 'react'
import {View,Text} from 'react-native'

const Location_childview=({country,district, subdistrict, region})=>{
    return(
      <View style={{margin:"1%" ,borderRadius:10, backgroundColor:'white', elevation: 5}} >
        <View>
          <Text style={{color:'red',padding:5}}>{country}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{district}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{subdistrict}</Text>
        </View>
        <View>
          <Text style={{color:'red',padding:5}}>{region}</Text>
        </View>
      </View>
    )
  }

  export default Location_childview;