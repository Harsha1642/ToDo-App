import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addReducer = (state, action) => {
  switch (action.type) {

    case 'initial_state':
      return action.payload!==null?action.payload:[]

    case 'add_todo':
      state=[...state, {id:Math.floor(Math.random()*999999).toString(),title:action.payload.title,content:action.payload.content,date:action.payload.date,checked:false}];
      storeItem(state)
      return state

    case 'delete_todo':
      state=state.filter((value)=>value.id!==action.payload)
      storeItem(state)
      return state

    case 'edit_todo':
      state= state.map((item)=>{
        if(item.id===action.payload.id){
          return action.payload
        }else{
          return item
        }
      })
      storeItem(state)
      return state

    case 'is_checked':
      state= state.map((item)=>{
        if(item.id===action.payload){
          item.checked=!item.checked
          return item
        }else{
          return item
        }
      })
      
      storeItem(state)
      return state

    
    case 'is_dragged':
      state=[...action.payload]
      storeItem(state)
      return state

    default:
      storeItem(state)
      return state;
  }
};

const storeItem=async(arr)=>{await AsyncStorage.setItem("MyList",JSON.stringify(arr))}
const removeItem=async()=>await AsyncStorage.removeItem("MyList")
//removeItem()

const initialState=dispatch=>{
  return async()=>{
    const data=JSON.parse(await AsyncStorage.getItem("MyList"))
    dispatch({type:'initial_state',payload:data})
  }
}

const addToDo = dispatch => {
  return (title,content,date,callBack) => {
    dispatch({ type: 'add_todo',payload:{title,content,date} });
    callBack()
  };
};

const deleteToDo = dispatch => {
  return (id) => {
    dispatch({ type: 'delete_todo',payload:id });
  };
};

const editToDo = dispatch => {
  return (id,title,content,date,callBack) => {
    dispatch({ type: 'edit_todo',payload:{title,content,date,id} });
    callBack()
  };
};

const onclick=dispatch=>{
  return(id)=>{
    dispatch({type:'is_checked',payload:id})
  }
}

const isDragged=dispatch=>{
  return(state)=>{
    dispatch({type:'is_dragged',payload:state})
  }
}

export const { Context, Provider } = createDataContext(
  addReducer,
  { addToDo,deleteToDo,editToDo,onclick,isDragged,initialState},
  []
)

