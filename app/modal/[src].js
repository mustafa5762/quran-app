import React from 'react';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const Page = () => {
  const { source } = useLocalSearchParams();

  // Calculate the image height based on the device width and the image's aspect ratio
  const screenWidth = Dimensions.get('window').width;
  const imageAspectRatio = 16 / 9; // You can replace this with the actual aspect ratio of your image
  const imageHeight = screenWidth / imageAspectRatio;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
        <Ionicons name="arrow-back-outline" size={20} color="green" /> 
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()} style={styles.downloadButton}>
        <Ionicons name="download" size={20} color="green" /> 
        <Text style={styles.downloadText}>Download Image</Text>
      </TouchableOpacity>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={[styles.image, { width: screenWidth, height: imageHeight }]} resizeMode="cover" />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  image: {
    resizeMode: 'cover',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 60, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
  },
  goBackText: {
    marginLeft: 5, // Adjust the margin as needed
    color: 'green',
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 58.5, // Adjust the top position as needed
    right: 10, // Adjust the left position as needed
  },
  downloadText: {
    marginLeft: 5, // Adjust the margin as needed
    color: 'green',
    fontWeight: '500',
  },
});
