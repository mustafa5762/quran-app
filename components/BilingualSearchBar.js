import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Ionicons installed

const BilingualSearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = (text) => {
    setSearchText(text);
  };

  return (
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#404040" style={styles.icon} />
        <TextInput
          placeholder="یہاں تلاش کریں"
          onChangeText={handleSearchInputChange}
          value={searchText}
          style={styles.input}
          placeholderTextColor="#737373" // You can customize the placeholder text color
          textAlign="right" // Align the text to the right
          textAlignVertical="center" // Vertically center the text
        />
      </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#404040',
    flex: 1,
  },
});

export default BilingualSearchBar;



