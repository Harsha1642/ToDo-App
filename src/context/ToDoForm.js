import React,{Fragment, useState} from 'react'
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';

const ToDoForm=({onSubmit,initialValues})=>{
    const [title,setTitle]=useState(initialValues.title)
    const [content,setContent]=useState(initialValues.content)
    const [date,setDate]=useState(initialValues.date)

    const checkDate=(date,mon,year)=>{
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();
        let month="JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(mon)/3+1
        if(year<currentYear){
            return false
        }
        else if(month<currentMonth){
            return false
        }
        else if(month==currentMonth && date<currentDate){
            return false
        }
       return true

   }
   const getDateFromString=(str)=>{
       let date=parseInt(str.substring(8,10))
       let mon=str.substring(4,7)
       let year=str.substring(11,15)
       return checkDate(date,mon,year)
   }
    return(
        <View >
           <Text style={styles.label}>Enter Title</Text>
           <TextInput
               style={styles.input}
               onChangeText={(text)=>setTitle(text)} 
               value={title}
           />
           <Text style={styles.label}>Enter ToDo</Text>
           <TextInput
               style={styles.input}
               onChangeText={(text)=>setContent(text)} 
               value={content}
           
           />
           <Text style={styles.label}>Set Date For Your ToDo..</Text>
           <View style={styles.calenderStyle}>
                <CalendarPicker
                    previousTitleStyle={{fontWeight:"bold"}}
                    nextTitleStyle={{fontWeight:"bold"}}
                    onDateChange={(newDate)=>{
                        setDate(getDateFromString(newDate.toString())?newDate.toString().substring(0,16):alert("😒Can't go back now🥺"))}}           
                />
                <View>
                <Text style={styles.dateStyle}>SELECTED DATE : {date}</Text>
                </View>
            </View>
            <View style={styles.buttonStyle}>
               <TouchableOpacity  onPress={()=>onSubmit(title,content,date)} >
                   <Text style={{fontWeight:"bold",color:"pink"}}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
ToDoForm.defaultProps={
    initialValues:{
        title:"",
        content:"",
        date:""
    }
}
const styles=StyleSheet.create({
    label:{
        fontSize:18,
        margin:8,
        color:"blue",
        fontWeight:"bold",
    },
    input:{
        margin:7,
        borderBottomWidth:1,
        borderBottomColor:"black",
        fontSize:18,
        paddingBottom:0
    },
    buttonStyle:{
        padding:10,
        alignSelf:"center",
        width:"30%",
        margin:8,
        borderRadius:30,
        backgroundColor:"maroon",
        paddingHorizontal:32,
    },
    calenderStyle:{
        margin:8,
        borderWidth:2,
        backgroundColor:"darkcyan"

    },
    dateStyle:{
        fontWeight:"bold",
        color:"yellow"
    }
})
export default ToDoForm;