import createDataContext from './createDataContext';

const addReducer = (state, action) => {
  switch (action.type) {
    case 'add_todo':
      return [...state, {id:Math.floor(Math.random()*99999),title:action.payload.title,content:action.payload.content,date:action.payload.date,checked:false}];
    case 'delete_todo':
      return state.filter((value)=>value.id!==action.payload)
    case 'edit_todo':
      return state.map((item)=>{
        if(item.id===action.payload.id){
          return action.payload
        }else{
          return item
        }
      })
      case 'is_checked':
        return state.map((item)=>{
          if(item.id===action.payload){
            item.checked=!item.checked
            return item
          }else{
            return item
          }
        })

    default:
      return state;
  }
};

const addToDo = dispatch => {
  return (title,content,date,callBack) => {
    dispatch({ type: 'add_todo',payload:{title,content,date,isCheked:false} });
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
export const { Context, Provider } = createDataContext(
  addReducer,
  { addToDo,deleteToDo,editToDo,onclick},
  [{id:1,title:"React-Native",content:"Learn React-Native Basics",date:"Thu Apr 1 2021",checked:false},
  {id:2,title:"Movie",content:"Book movie tickets",date:"Fri Apr 2 2021",checked:false},
  {id:3,title:"Anime",content:"Watch anime",date:"Sat Apr 3 2021",checked:false},
  {id:4,title:"Shopping",content:"Go to shopping",date:"Sun Apr 4 2021",checked:false},
  {id:5,title:"Sleep",content:"Do nothing",date:"Mon Apr 5 2021",checked:false}
  ]
);
