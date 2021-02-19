import React,{useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import {Context} from '../context/ToDoContext'
import ToDoForm from '../context/ToDoForm'

 const ShowScreen=({navigation})=>{
    const {addToDo}=useContext(Context)
     return(
         <View style={styles.style}>
            <ToDoForm onSubmit={(title,content,date)=>addToDo(title,content,date,()=>navigation.navigate("Home"))}/>
         </View>
     )
 }
 const styles=StyleSheet.create({
     style:{
        flex:1,
        backgroundColor:"lightyellow",
        borderWidth:3,
        borderColor:"darkgreen"
     }
 })

 export default ShowScreen;