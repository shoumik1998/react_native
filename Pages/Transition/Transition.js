import React from "react";

import { Navigation } from "react-native-navigation"


const  Go=(component_name, props,component_id)=>{
    Navigation.push(component_id,{
        component: {
            name: component_name,
            options: {
                sideMenu: {
                    left: {
                        visible: false
                    }
                },
                topBar: {
                    visible: false
                }
            },
            passProps: {
                prop: props
            },

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
