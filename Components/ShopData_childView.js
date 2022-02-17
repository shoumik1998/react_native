import React from "react"
import { View,Text,Image } from "react-native"





const ShopData_chiled=({shop_name})=>{
    return(
        <View style={{margin:"1%" ,borderRadius:10, backgroundColor:'#99c1de', elevation: 5,flexDirection:"row"}} >
            <View style={{alignContent:'center',alignSelf:"center",padding:10}}>
                <Image style={{width:30,height:30,alignSelf:"center",padding:5,tintColor:"#1780a1"}} source={require("../Assets/store.png")}/>
            </View>
        <View>
          <Text style={{color:'#892b64',padding:5,fontSize:20,alignSelf:"center"}}>{shop_name}</Text>
        </View>
        
      </View>
    )
}

export default ShopData_chiled;