import React from 'react'
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import IndexScreen from './src/screens/IndexScreen';
import { Provider } from './src/context/ToDoContext';
import ShowScreen from './src/screens/ShowScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/EditScreen'
import Homepage from './src/screens/HomePage'

const navigator=createStackNavigator({

    ToDo:Homepage,
    Home:IndexScreen,
    List:ShowScreen,
    Create:CreateScreen,
    Edit:EditScreen
    },
    {
      defaultNavigationOptions:{
        headerTintColor:"pink",
        headerStyle:{
            backgroundColor:"black",
        },
        headerTitleStyle:{
          fontWeight:"bold",
          paddingLeft:70,
        }
            }
    }
)
 const App= createAppContainer(navigator)
 export default ()=>{
   return(
     <Provider><App/></Provider>
   )
 }