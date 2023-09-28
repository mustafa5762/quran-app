import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import useApiFetch from '../hooks/useApiFetch';
import GridItem from '../components/Category';
import { SafeAreaView } from 'react-native-safe-area-context';
import BilingualSearchBar from '../components/BilingualSearchBar';
import { StatusBar } from 'expo-status-bar';


const backgroundImage = require('../assets/bgfpa.webp');

const index = () => {
  const apiUrl = 'https://drab-pear-bunny-belt.cyclic.cloud/api/categories'; // Replace with your API URL
  const { data, loading, error } = useApiFetch(apiUrl);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
          <BilingualSearchBar />

          {/* Responsive Image */}
          <Image
            source={require('../assets/cover-image.webp')} 
            style={styles.responsiveImage}
            resizeMode="contain" // This will maintain the image's aspect ratio
          />

          <FlatList
            style={{marginTop: 30}}
            data={data}
            keyExtractor={(item) => item._id}
            numColumns={2} // Display 3 items per row
            renderItem={({ item }) => <GridItem item={item} />}
            ItemSeparatorComponent={() => <View style={{height: 15, width: 10}} />}
            showsVerticalScrollIndicator={false}
          />
          <StatusBar />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  responsiveImage: {
    width: '100%',
    height: 260,
    marginTop: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
});
