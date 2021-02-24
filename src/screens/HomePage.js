import React ,{useState} from 'react'
import {View ,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'

const HomePage=(props)=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    return(
        <View style={{flex:1,backgroundColor:"aqua",justifyContent:"center",paddingBottom:60}}>

            <View style={styles.background}>
                <TextInput
                    style={{fontSize:18,paddingLeft:10,paddingBottom:0}}
                    placeholder="Username"
                    onChangeText={(newText)=>setUsername(newText)}
                    value={username}
                />
            </View>
            <View style={styles.background}>
                <TextInput
                    secureTextEntry={true}
                    style={{fontSize:18,paddingLeft:10,paddingBottom:0}}
                    placeholder="Password"
                    onChangeText={(newText)=>setPassword(newText)}
                    value={password}
                />
            </View>
            <View style={styles.opacitystyle}>
                <TouchableOpacity
                    onPress={()=>{
                        if(username=="" && password==""){
                            //props.navigation.navigate("Home")
                            alert("Enter Username & Password")
                            
                        }
                        else if(username==""){
                            alert("Username cannot be empty")
                        }
                        else if(password==""){
                            alert("Password cannot be empty")
                        }
                        else{
                            username=="123" && password=="123"?props.navigation.navigate("Home"):alert("Invalid details")}}
                    }>
                
                <Text style={{fontSize:24,color:"darkgreen",fontWeight:"bold"}}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
HomePage.navigationOptions=()=>{
    return{
    headerTintColor:"firebrick",
    headerStyle:{
        backgroundColor:"aqua"
        
    },headerTitleStyle:{
        fontWeight:"bold",
        paddingLeft:120
    }
}
}
const styles=StyleSheet.create({
    background:{
       height:45,
       marginHorizontal:50,
       marginTop:40,
       borderWidth:2,
       backgroundColor:"white",
       borderRadius:20,
       borderColor:"purple",
    },
    opacitystyle:{
        marginHorizontal:125,
        marginTop:30,

    }
})
export default HomePage;