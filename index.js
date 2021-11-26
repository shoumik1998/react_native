import { Navigation } from "react-native-navigation";
import  HomePage from './Pages/Homepage';
import  Aboutpage from './Pages/AboutPage';
import SettingsPage from './Pages/SettingsPage';
import Contact from "./Contact";
import ModalScreen from "./Pages/ModalScreen";
import Search from "./Pages/Search";
import Details from "./Pages/Details";


Navigation.registerComponent('Home',()=>HomePage)
Navigation.registerComponent("About", () => Aboutpage);
Navigation.registerComponent("Settings", () => SettingsPage);
Navigation.registerComponent('Contact',()=>Contact)
Navigation.registerComponent('Modal',()=>ModalScreen)
Navigation.registerComponent('Search',()=>Search)
Navigation.registerComponent('Details',()=>Details)


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


Navigation.events().registerAppLaunchedListener(()=>{
  Navigation.setRoot({
    root:{
      sideMenu:{
        left:{
          component:{
            name:'About'
          }
        },
        center:{
          stack:{
            id:'mainscreen',
            children:[
              {
                component:{
                  name:'Home',
                  options:{

                    topBar:{
                      leftButtons:{
                        id:'button',
                        icon:require('./Pages/menuicon.png')
                      }
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
})

