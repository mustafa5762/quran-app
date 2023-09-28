import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';


const CustomImage = ({source}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
      >
        <Ionicons name="image-outline" size={20} color="#16a34a" style={styles.icon} />
       <Link
        style={styles.text}
        href={{
          pathname: "/modal/2",
          // /* 1. Navigate to the details route with query params */
          params: { source: source },
        }}
      >
        
        Click Here to view Refrence Image
      </Link>
      </TouchableOpacity>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal: 4,
  },
  text: {
    color: '#16a34a',
    marginLeft: 7,
    fontWeight: '500',
  },
});
