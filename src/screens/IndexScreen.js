import React, { useContext,useState} from 'react';
import { View,Text, StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { Context } from '../context/ToDoContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CheckBox from 'react-native-check-box'
import DraggableFlatList from 'react-native-draggable-flatlist';

const IndexScreen = ({navigation}) => {

  const {state,deleteToDo,onclick,addToDo,isDragged} = useContext(Context)
  const [content,setContent]=useState("")

  return (
    <View style={styles.style}>

      <TextInput 
        style={styles.textInputStyle}
        placeholder="Quick Add Here"
        value={content}
        onChangeText={(text)=>setContent(text)}
        onSubmitEditing={()=>{addToDo(`Quick Added ${state.length+1}`,content,"",()=>{}),setContent("")}}/>

      <Text style={styles.textStyle}>Your ToDo Items</Text>

      <DraggableFlatList
        data={state}
        keyExtractor={item => item.id}
        onDragEnd={(data)=>isDragged(data.data)}
        renderItem={({ item,drag}) => {
          return(
            <TouchableOpacity onPress={()=>item.checked?alert("Please Uncheck First"):navigation.navigate("List",{id:item.id})}  onLongPress={drag} delayLongPress={50}>

              <View style={item.checked?styles.onclicked:styles.notclicked}>

                <CheckBox
                  checkBoxColor="white"
                  isChecked={item.checked}
                  onClick={()=>onclick(item.id)}/>
          
                    <Text style={item.checked?styles.titleSizeonclick:styles.titleSizenotclick}>{item.title}</Text>
                    <Text style={item.checked?styles.dateSizeonclick:styles.dateSizenotclick}>{item.date}</Text>
                <TouchableOpacity onPress={()=>deleteToDo(item.id)}>
                  <AntDesign style={styles.iconSize} name="delete"/>
                </TouchableOpacity>  

              </View>
             
            </TouchableOpacity>
            )
            
        }}
      />

    </View>
  )
}

IndexScreen.navigationOptions=({navigation})=>{

  return{
    headerRight:()=>
    <TouchableOpacity onPress={()=>navigation.navigate("Create")}>
      <AntDesign style={{marginRight:20,fontSize:30,color:"orangered"}} name="plus"/>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  style:{
    flex:1,
    backgroundColor:"black",
  },
  textStyle:{
      fontSize:18,
      fontWeight:"bold",
      color:"crimson",
      paddingLeft:93,
      paddingBottom:6,
  },
  onclicked:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:9,
    borderWidth:1,
    margin:8,
    borderRadius:20,
    paddingHorizontal:20,
    backgroundColor:"gray",
  },
  notclicked:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:9,
    margin:8,
    borderWidth:1.2,
    borderColor:"mediumaquamarine",
    paddingHorizontal:16,
    backgroundColor:"black",
  },
  titleSizeonclick:{
    fontSize:17,
    color:"orange",
    textDecorationLine:"line-through"
    
  },
  dateSizeonclick:{
    fontSize:17,
    color:"cyan",
    textDecorationLine:"line-through",

  },
  titleSizenotclick:{
    fontSize:17,
    color:"springgreen",
    
    
  },
  dateSizenotclick:{
    fontSize:17,
    color:"yellow",
  },
  iconSize:{
    fontSize:22,
    color:"darkred",
  },

  textInputStyle:{
    fontSize:18,
    paddingLeft:10,
    borderWidth:1,
    backgroundColor:"mintcream",
    height:45,
    margin:20,
    color:"navy",
    borderRadius:20
  }
});

export default IndexScreen;
