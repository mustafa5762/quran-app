// GlobalStateContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Create a context
const GlobalStateContext = createContext();

// Initial state
const initialState = {
  name: '',
  isPlaying: false, // Add isPlaying to the state
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

// Global state provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
