import React, { useContext,useState } from 'react';
import { View,Text, StyleSheet, FlatList,TouchableOpacity,TextInput} from 'react-native';
import { Context } from '../context/ToDoContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CheckBox from 'react-native-check-box'
import * as Animatable from 'react-native-animatable'

const IndexScreen = ({navigation}) => {
  
  const { state,deleteToDo,onclick,addToDo} = useContext(Context)
  const [content,setContent]=useState("")

  const fadeIn = {
    
    from: {
      opacity: 0.5  
    },
    to: {
      opacity: 1
    }
  }

  return (
    <View style={styles.style}>

      <TextInput 
        style={styles.textInputStyle}
        placeholder="Quick Add Here"
        value={content}
        onChangeText={(text)=>setContent(text)}
        onSubmitEditing={()=>{addToDo(`Quick Added ${state.length+1}`,content,"",()=>{}),setContent("")}}/>

      <Text style={styles.textStyle}>Your ToDo Items</Text>

      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return(
            <TouchableOpacity onPress={()=>item.checked?alert("Please Uncheck First"):navigation.navigate("List",{id:item.id})}>

              <View style={item.checked?styles.onclicked:styles.notclicked}>

                <CheckBox
                checkBoxColor="white"
                isChecked={item.checked}
                onClick={()=>onclick(item.id)}/>

                {!item.checked?
                  <Animatable.Text 
                  animation={fadeIn} 
                  iterationCount="infinite" 
                  style={item.checked?styles.titleSizeonclick:styles.titleSizenotclick}>
                  {item.title}
                  </Animatable.Text>:

                  <Text style={item.checked?styles.titleSizeonclick:styles.titleSizenotclick}>{item.title}</Text>
                }

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
  );
};

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
    padding:12,
    borderWidth:1,
    margin:8,
    borderRadius:20,
    paddingHorizontal:20,
    backgroundColor:"gray",
  },
  notclicked:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:12,
    margin:8,
    marginLeft:10,
    borderWidth:1.5,
    borderColor:"mediumaquamarine",
    borderRadius:0,
    paddingHorizontal:20,
    backgroundColor:"black"
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
    fontWeight:"900",
    
  },
  dateSizenotclick:{
    fontSize:17,
    color:"yellow"
  },
  iconSize:{
    fontSize:22,
    color:"darkred",
  },
  touchableOpacityStyle:{
    padding:10,
    alignSelf:"center",
    width:"35%",
    borderWidth:1,
    margin:8,
    borderColor:"grey",
    borderRadius:40,
    backgroundColor:"grey",
    paddingHorizontal:20,
  },
  touchableOpacityTextStyle:{
    fontSize:18,
    fontWeight:"bold",
    alignSelf:"center",
    color:"white"
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
