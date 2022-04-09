import React from 'react'
import {View,Text} from 'react-native'

const Location_childview=({country,district, subdistrict, region})=>{
    return(
      <View style={{margin:"1%" ,borderRadius:10, backgroundColor:'gray', elevation: 5}} >
        <View style={{alignSelf:'center'}}>
          <Text style={{color:'#f5f5f5',padding:5}}>{region}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <View>
          <Text style={{color:'white',padding:5}}>{subdistrict}</Text>
        </View>
        <View>
          <Text style={{color:'white',padding:5}}>{district}</Text>
        </View>
        <View>
          <Text style={{color:'white',padding:5}}>{country}</Text>
        </View>
        </View>
        
        
        


        
      </View>
    )
  }

  export default Location_childview;