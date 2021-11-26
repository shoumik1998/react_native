import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Navigation } from "react-native-navigation";

class Homepage extends Component {




constructor(props) {
  super(props);
  Navigation.events().bindComponent(this)
}

goAbout=()=>{
  Navigation.push(this.props.componentId,{
    component:{
      name:'About',
      options:{
        topBar:{
          title:{
            component:{
              name:'Search',
              alignment:"fill"
            }
          }
        },
        animations:{
          push:{
            elementTransitions:[
              {
                id:'textID',
                alpha:{
                  from:0,
                  duration:300,
                },
                translationY:{
                  from:16,
                  duration:300
                }
              }
            ],
            content:{
              translationX:{

                from: require('react-native').Dimensions.get('window').width,
                to:0, duration:300
              }
            },

          },
          pop:{
            content:{
              translationX:{
                from:0,
                to: require('react-native').Dimensions.get('window').width,
                duration:300

              }
            },

          }
        }
      }
    }
  })

}
goModal=()=>{
  Navigation.showModal({
    component:{
      name:'Modal',
      options:{
        animations:{
          showModal:{
            alpha:{
              from:100,
              to:100,duration:300
            }
          }
        }
      }
    }

  })
}
gosettings=()=>{
  Navigation.push(this.props.componentId,{
    component:{
      name:'Settings'
    }
  })
}
goContact=()=>{
  Navigation.push(this.props.componentId, {
    component:{
      name:'Contact',
      options:{
        topBar:{
          visible:false
        },
        // animations:{
        //   push:{
        //     content:{
        //       translationX:{
        //         from: require('react-native').Dimensions.get('window').width,
        //         to :0, duration:300,
        //         startDelay:1
        //
        //       }
        //     }
        //   },
        //   pop:{
        //     content:{
        //       translationX:{
        //         from:0,
        //         to: require('react-native').Dimensions.get('window').width,
        //         duration:300
        //       }
        //     }
        //   }
        // }
      }
    }
    }
  )
}



  render() {
    return (
      <View>
        <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:36}}>Home page</Text>
        </View>
        <View style={{margin:10}}>
          <Button title='Modal' onPress={this.goModal}/>
        </View>
        <View style={{margin:10}}>
          <Button title='Settings' onPress={this.gosettings}/>
        </View>
        <View style={{margin:10}}>
          <Button title='About' onPress={this.goAbout}/>
        </View>
        <View style={{margin:10}}>
          <Button title='Contact' onPress={this.goContact}/>
        </View>
      </View>
    );
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'button') {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }
}

export default Homepage;
