import React from "react";
import { Center, NativeBaseProvider } from "native-base";
import { View ,Text,Image,StyleSheet,Alert, TouchableOpacity} from "react-native";
import Circle from "./Round";
import Transition from "../Transition/Transition";
import { Navigation } from "react-native-navigation";

const gooo=(component_name,props)=>{
    Navigation.push("h_screen",{
        component:{
            name:component_name,
            options:{
                topBar:{
                    visible:false
                },
                sideMenu:{
                    left:{
                        visible:false
                    }
                }
            },
            passProps:{
                props: props
            }
        }
    })
}

const Side_menu_page=()=>{
    return(
        
                <View style={{flex:10,marginRight:"10%"}}>
                    <View style={{flex:3,backgroundColor:"white",justifyContent:'center',alignItems:'center',borderBottomWidth:1}}>
                        <Circle style_add={{width:80,height:80,borderRadius:50}}/>
                        

                    </View>
                    <View style={{flex:7,backgroundColor:"white",justifyContent:'space-evenly'}}>
                        <TouchableOpacity onPress={()=>{gooo("Contact","looking_for_shop")}}>
                            <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/search.png")} />
                            <Text style={styles.text_styles} >Search Shop</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>gooo("Contact",null) }>
                           <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/map.png")} />
                            <Text style={styles.text_styles} >Search region</Text>
                        </View> 
                        </TouchableOpacity>

                        <TouchableOpacity>
                           <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/download.png")} />
                            <Text onPress={()=>{gooo("Contact")}} style={styles.text_styles} >Saved</Text>
                        </View> 
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/shopping-cart.png")} />
                            <Text style={styles.text_styles} >Orders</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/history.png")} />
                            <Text style={styles.text_styles} >History</Text>
                        </View>
                        </TouchableOpacity>
                        
                        
                        
                        <TouchableOpacity>
                           <View style={styles.view_styles}>
                            <Image style={styles.image_styles} source={require("../Assets/login.png")} />
                            <Text style={styles.text_styles} >LogIn</Text>
                        </View> 
                        </TouchableOpacity>
                        

                    </View>
                    
                </View>
            
    )
}

    const styles=StyleSheet.create(
        {
            image_styles:{
                height:30,width:30,tintColor:"black",marginRight:10
            },
            text_styles:{
                color:"black",fontSize:18
            },
            view_styles:{
                flexDirection:"row",marginLeft:"10%"
            }
        }
    )


export default Side_menu_page;