import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import useApiFetch from '../../hooks/useApiFetch';
import ArticleCard from '../../components/ArticleCard';

const Page = () => {
    const { _id } = useLocalSearchParams();

    const apiUrl = `https://drab-pear-bunny-belt.cyclic.cloud/api/articles`; // Replace with your API URL
    const { data, loading, error } = useApiFetch(apiUrl);


    if (loading) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#fff'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={data.articles}
          keyExtractor={(item) => item._id}
          numColumns={1} // Display 3 items per row
          renderItem={({ item }) => <ArticleCard item={item} />}
        />
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    paddingHorizontal: 10,
  },
});