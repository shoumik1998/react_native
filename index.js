import { Navigation } from "react-native-navigation";
import  Rand from './Pages/Rand';
import  Aboutpage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import Contact from "./Contact";
import ModalScreen from "./Pages/ModalScreen";
import Search from "./Pages/Search";
import Details from "./Pages/Details";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AShop from "./Pages/AShop";
import Side_menu from "./Components/Side_menu"
import Saved from "./Pages/Saved"
import OrderedProducts from './Pages/MyOrderedProduct'


Navigation.registerComponent('Home',()=>HomePage,)
Navigation.registerComponent("About", () => Aboutpage);
Navigation.registerComponent("Settings", () => HomePage);
Navigation.registerComponent('Contact',()=>Contact)
Navigation.registerComponent('Modal',()=>ModalScreen)
Navigation.registerComponent('Search',()=>Search)
Navigation.registerComponent('Details',()=>Details)
Navigation.registerComponent('Login',()=>Login)
Navigation.registerComponent('Registration',()=>Registration)
Navigation.registerComponent('AShop',()=>AShop)
Navigation.registerComponent('Side_menu',()=>Side_menu)
Navigation.registerComponent('Saved',()=>Saved)
Navigation.registerComponent('OrderedProducts',()=>OrderedProducts)



Navigation.setDefaultOptions({
  animations:{
    push:{
      content:{
        translationX:{
          from: require('react-native').Dimensions.get('window').width,
          to:0,duration:250
        }
      }
    },
    pop:{
      content:{
        translationX:{
          from:0,
          to: require('react-native').Dimensions.get('window').width,
          duration:250

        }
      }
    }
  }
})


Navigation.events().registerAppLaunchedListener(async ()=>{
  


  try {
    var user_name=await AsyncStorage.getItem("user_name")
    var password=await AsyncStorage.getItem("password")
    var country=await AsyncStorage.getItem("country")
    var district=await AsyncStorage.getItem("district")
    var subdistrict= await AsyncStorage.getItem("subdistrict")
    var region=await AsyncStorage.getItem("region")

  }catch (e) {

  }




  if (country !==null && district !==null && subdistrict !==null && region!==null) {

    Navigation.setRoot({
      root:{
        sideMenu:{
          left:{
            component:{
              name:"Side_menu"
            }
          },
          center:{
            stack:{
          id:'home_screen',
          children:[
            {
              component:{
                name:'Home',
                id:"h_screen",
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
        
      }
    })
  

  }else {
    Navigation.setRoot({
      root:{
        stack:{
          children:[
            {
              component:{
                name:'Contact',
                id:"contact_id",
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
    })
  }

})

