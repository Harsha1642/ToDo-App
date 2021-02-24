import createDataContext from './createDataContext';

const addReducer = (state, action) => {

  const dateSort=(a,b)=>{
    const mon="JanFebMarAprMayJunJulAugSepOctNovDec"
    const month1=mon.indexOf(a.date.substring(4,7))/3+1
    const month2=mon.indexOf(b.date.substring(4,7))/3+1
    const date1=parseInt(a.date.substring(8,10))
    const date2=parseInt(b.date.substring(8,10))
    return month1<month2?-1:month1>month2?1:date1<date2?-1:date1>date2?1:0
  }
  
  switch (action.type) {

    case 'add_todo':

      state=[...state, {id:Math.floor(Math.random()*99999).toString(),title:action.payload.title,content:action.payload.content,date:action.payload.date,checked:false}];

      state.sort(dateSort)
      
    case 'delete_todo':

      return state.filter((value)=>value.id!==action.payload)

    case 'edit_todo':

      return state.map((item)=>{
        if(item.id===action.payload.id){
          return action.payload
        }else{
          return item
        }
      }).sort(dateSort)

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

export const { Context, Provider } = createDataContext(
  addReducer,
  { addToDo,deleteToDo,editToDo,onclick},
  [{id:"1",title:"Java",content:"Learn Java Basics",date:"Thu Apr 01 2021",checked:false},
  {id:"2",title:"Movies",content:"Book movie tickets",date:"Fri Apr 02 2021",checked:false},
  {id:"3",title:"Anime",content:"Watch anime",date:"Sat Apr 03 2021",checked:false},
  {id:"5",title:"Python",content:"Learn Python",date:"Mon Apr 05 2021",checked:false},
  {id:"4",title:"Shopping",content:"Go to shopping",date:"Sun Apr 04 2021",checked:false},
  
  ]
);
