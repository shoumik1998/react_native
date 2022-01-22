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


Navigation.registerComponent('Home',()=>HomePage)
Navigation.registerComponent("About", () => Aboutpage);
Navigation.registerComponent("Settings", () => HomePage);
Navigation.registerComponent('Contact',()=>Contact)
Navigation.registerComponent('Modal',()=>ModalScreen)
Navigation.registerComponent('Search',()=>Search)
Navigation.registerComponent('Details',()=>Details)
Navigation.registerComponent('Login',()=>Login)
Navigation.registerComponent('Registration',()=>Registration)


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
  // this.state={
  //   user_name:'',
  //   password:''
  // }
  //
  //
  // try {
  //   this.setState({user_name: await AsyncStorage.getItem("user_name")})
  //   this.setState({password: await AsyncStorage.getItem("password")})
  // }catch (e) {
  //
  // }


  try {
    var user_name=await AsyncStorage.getItem("user_name")
    var password=await AsyncStorage.getItem("password")

  }catch (e) {

  }



  if (user_name!==null && password!==null) {
    Navigation.setRoot({
      root: {

            stack: {
              id: "mainscreen",
              children: [
                {
                  component: {
                    name: "Contact",
                    options: {

                      topBar: {
                        visible:false
                      },
                    },
                  },
                },
              ],
            },
          }
    });
  } else {
    Navigation.setRoot({
      root:{
        stack:{
          children:[
            {
              component:{
                name:'Login',
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

