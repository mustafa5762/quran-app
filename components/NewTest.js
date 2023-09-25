import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useGlobalState } from '../GlobalStateContext';

function MyComponent() {
  const { state, dispatch } = useGlobalState();

  const setName = (name) => {
    dispatch({ type: 'SET_NAME', payload: name });
  };

  return (
    <View>
      <Text>My Name: {state.name}</Text>
      <TextInput
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
      />
    </View>
  );
}

export default MyComponent;
