import  React,{useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import { Context } from '../context/ToDoContext';
import ToDoForm from '../context/ToDoForm'
const EditScreen=({navigation})=>{
    const id=navigation.getParam("id")
    const { state,editToDo} = useContext(Context)
    const todo = state.find(item => item.id === id)

    return(
        <View style={styles.style}>
            <ToDoForm
                initialValues={{title:todo.title,content:todo.content}}
                onSubmit={(title,content,date)=>editToDo(id,title,content,date,()=>navigation.navigate("List"))}
            />

        </View>
    )
}
const styles=StyleSheet.create({
    style:{
        flex:1,
        backgroundColor:"honeydew",
        borderWidth:3,
        borderColor:"orange"
    }
})
export default EditScreen;