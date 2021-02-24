import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const totalActions = {};

    for (let key in actions) {
      totalActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{ state, ...totalActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
