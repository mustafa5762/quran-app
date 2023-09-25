import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useApiFetch from '../hooks/useApiFetch';
import GridItem from '../components/Category';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  const apiUrl = 'https://drab-pear-bunny-belt.cyclic.cloud/api/categories'; // Replace with your API URL
  const { data, loading, error } = useApiFetch(apiUrl);

  if (loading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={2} // Display 3 items per row
        renderItem={({ item }) => <GridItem item={item} />}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
      />
    </SafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Ensure items are laid out in rows
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});