import React from "react";

import { Navigation } from "react-native-navigation"


const  Go=(component_name, props,component_id)=>{
    Navigation.push(component_id,{
        component:{
            name:component_name,
            passProps:{
                prop:props
            },
        options:{
            topBar:{
                visible:false
            }
        }
        },
        
    })
}

const Set_Root=(component_name)=>{
    Navigation.setRoot(
        {
            root:{
                stack:{
                    children:[
                        {
                            component:{
                                name:component_name,
                                options:{
                                    topBar:{
                                        visible:false
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    )
}

export default {Go,Set_Root};
