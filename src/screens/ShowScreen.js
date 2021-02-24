import React, { useContext } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Context } from '../context/ToDoContext';
import AntDesign from 'react-native-vector-icons/AntDesign'

const ShowScreen = ({ navigation }) => {
  
  const { state } = useContext(Context);
  const todo= state.find(item => item.id === navigation.getParam('id'));

  return (

    <View style={styles.viewStyle}>

      <Text style={styles.headingStyle}>{todo.title}</Text>
      <Text style={styles.headingStyle}>DueDate:{todo.date}</Text>
      <Text style={styles.textStyle}>{todo.content}</Text>

    </View>
  );
};styles

ShowScreen.navigationOptions=({navigation})=>{

    return{
      headerRight:()=>
      <TouchableOpacity onPress={()=>navigation.navigate("Edit",{id:navigation.getParam("id")})}>
        <AntDesign style={{marginRight:24,fontSize:30,color:"orangered"}} name="edit"/>
      </TouchableOpacity>
    }
  }
  

const styles = StyleSheet.create({
  
    viewStyle:{
      flex:1,
      borderColor:"cyan",
      borderWidth:3,
      backgroundColor:"powderblue"

    },
    textStyle:{
        fontSize:18,
        marginTop:10,
        marginLeft:10
    },
    headingStyle:{
      marginLeft:10,
      paddingTop:8,
      fontWeight:"bold",
      paddingLeft:10,
      fontSize:18,
      borderWidth:1.5,
      borderColor:"blue",
      marginTop:10,
      marginRight:80,
      borderRadius:15,
      height:45,
      backgroundColor:"lightgreen",
      color:"maroon"


    }
});

export default ShowScreen;