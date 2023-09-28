import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import useApiFetch from '../../hooks/useApiFetch';
import ArticleCard from '../../components/ArticleCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Page = () => {
  const { _id } = useLocalSearchParams();

  const apiUrl = `https://drab-pear-bunny-belt.cyclic.cloud/api/articles`;

  const { data, loading, error } = useApiFetch(apiUrl);


 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.articles}
        keyExtractor={(item) => item._id}
        numColumns={1}
        renderItem={({ item }) => <ArticleCard item={item} />}
        showsVerticalScrollIndicator={false}
        // Add a "Load More" button at the end of the list
      />
    </SafeAreaView>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  button: {
    elevation: 0,
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 13,
    backgroundColor: '#16a34a',
  }
});

