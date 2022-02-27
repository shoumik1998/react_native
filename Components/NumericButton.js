import { Circle,Button ,HStack,NativeBaseProvider} from "native-base";
import React ,{useState} from "react";
import { View ,StyleSheet,Dimensions,  TouchableOpacity, Image,Text,Alert} from "react-native";


const NumericButton=()=>{
    
   const [number,setNumber]=useState(0)
   if (number<0) {
       setNumber(0)
   }
    return(
        <View style={styless.root_view}>
            <View style={styless.top_view}>
                <TouchableOpacity>
                    <View>
                        <HStack>
                         <Circle size={10} bg="primary.400">
                         <TouchableOpacity onPress={()=>setNumber(number-1)} style={{width:"100%",height:"100%",justifyContent:'center'}}>
                                 <Image style={{width:"50%",height:"50%",tintColor:"white",alignSelf:'center'}} source={require('../Assets/minus96.png')}/>
                             </TouchableOpacity>
                        </Circle>   
                        </HStack>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                   <View style={{alignSelf:'flex-end'}}>
                       
                   <Text style={{fontSize:24,color:"black"}}>{number}</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                    <HStack>
                         <Circle size={10} bg="primary.400">
                             <TouchableOpacity onPress={()=>setNumber(number+1)} style={{width:"100%",height:"100%",justifyContent:'center'}}>
                                 <Image style={{width:"50%",height:"50%",tintColor:"white",alignSelf:'center'}} source={require('../Assets/plus90.png')}/>
                             </TouchableOpacity>
                            
                        </Circle>   
                        </HStack>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
              <Button onPress={()=>{Alert.alert('hm')}}>ORDER</Button>
            </View>
        </View>
        
    )
}

const styless=StyleSheet.create({
    root_view:{
        width:"50%",
        height:"100%",
        marginLeft:"20%",
       
        justifyContent:'space-evenly'
    },
    top_view:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'space-evenly'
    }
})

export default NumericButton;