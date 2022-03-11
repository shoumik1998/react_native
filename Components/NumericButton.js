import React ,{useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Circle,Button ,HStack,NativeBaseProvider} from "native-base";
import { View ,StyleSheet,Dimensions,  TouchableOpacity, Image,Text,Alert} from "react-native";
import OrderInfoDialog from "./OrderInfoDialog";
import LogCheckerDialog from "./LogCheckerDialog";




const NumericButton=()=>{
    
   const [number,setNumber]=useState(0)
   const [log_number,setLog_Number]=useState(0)
   const [orderDialogStatus,setOrderDialogSatus]=useState(0)
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
                {
                    orderDialogStatus>0 && <OrderInfoDialog modal_visible_status={orderDialogStatus} /> ||
                    log_number>0 && <LogCheckerDialog modal_visible_status={log_number}/>
                }
                
                    
                
                
              <Button onPress={async()=>{
                  const log_status=await AsyncStorage.getItem("phn_gmail")
                  if (log_status==="a" || log_status==null) {
                      setLog_Number(log_number+1)
                      //Alert.alert(log_number.toString())
                      
                  }else{
                      setOrderDialogSatus(orderDialogStatus+1)
                    //   Alert.alert(orderDialogStatus.toString())
                      
                      
                  }

              }}>ORDER</Button>
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