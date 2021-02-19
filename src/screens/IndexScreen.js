import React, { useContext,useState } from 'react';
import { View,Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Context } from '../context/ToDoContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CheckBox from 'react-native-check-box'

const IndexScreen = ({navigation}) => {
  const { state,deleteToDo,onclick} = useContext(Context);
  return (
    <View style={styles.style}>
      <FlatList
        data={state}
        keyExtractor={item => item.title}
        renderItem={({ item }) => {
          return(
            <TouchableOpacity onPress={()=>navigation.navigate("List",{id:item.id})}>
              <View style={item.checked?styles.onclicked:styles.notclicked}>
                <CheckBox
                checkBoxColor="white"
                isChecked={item.checked}
                onClick={()=>onclick(item.id)}
                />
                <Text style={item.checked?styles.titleSizeonclick:styles.titleSizenotclick}>{item.title}</Text>
                <Text style={item.checked?styles.dateSizeonclick:styles.dateSizenotclick}>{item.date}</Text>
                <TouchableOpacity onPress={()=>deleteToDo(item.id)}>
                  <AntDesign style={styles.iconSize} name="delete"/>
                </TouchableOpacity>     
              </View>
            </TouchableOpacity>)
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions=({navigation})=>{
  return{
    headerRight:()=>
    <TouchableOpacity onPress={()=>navigation.navigate("Create")}>
      <AntDesign style={{marginRight:20,fontSize:30,color:"darkgreen"}} name="plus"/>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  style:{
    flex:1,
    backgroundColor:"black",
  },
  onclicked:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:12,
    borderWidth:1,
    margin:8,
    borderRadius:20,
    paddingHorizontal:20,
    backgroundColor:"gray"
  },
  notclicked:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:12,
    margin:8,
    borderWidth:1,
    borderColor:"forestgreen",
    borderRadius:20,
    paddingHorizontal:20,
    backgroundColor:"black"
  },
  titleSizeonclick:{
    fontSize:17,
    color:"orange"
    
  },
  dateSizeonclick:{
    fontSize:17,
    color:"cyan"
  },
  titleSizenotclick:{
    fontSize:17,
    color:"springgreen"
    
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
  }
});

export default IndexScreen;
