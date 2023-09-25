import React from 'react';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { source } = useLocalSearchParams();

  // Calculate the image height based on the device width and the image's aspect ratio
  const screenWidth = Dimensions.get('window').width;
  const imageAspectRatio = 16 / 9; // You can replace this with the actual aspect ratio of your image
  const imageHeight = screenWidth / imageAspectRatio;

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => router.back()}>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={[styles.image, { width: screenWidth, height: imageHeight }]} resizeMode="cover" />
    </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});
