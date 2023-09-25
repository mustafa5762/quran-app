import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, } from 'react-native';

const CustomImage = ({source}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
      >
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
  text: {
    color: 'green',
    marginLeft: 7,
  },
});
