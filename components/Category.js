import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


const GridItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => router.push(`/category/${item._id}`)}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.text}>{item.name.en}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    aspectRatio: 1, // Ensure the container maintains a square aspect ratio
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%', // The image will fill the container while maintaining its aspect ratio
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '500',
    color: '#171717',
    textTransform: 'capitalize',
  }
});

export default GridItem;