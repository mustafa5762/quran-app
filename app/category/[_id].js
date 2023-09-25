import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useApiFetch from '../../hooks/useApiFetch';
import SubCategory from '../../components/SubCategory';


export default function Page() {
  const { _id } = useLocalSearchParams();

  const apiUrl = `https://drab-pear-bunny-belt.cyclic.cloud/api/category/${_id}`; // Replace with your API URL
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
              data={data.subcategories}
              keyExtractor={(item) => item._id}
              numColumns={2} // Display 3 items per row
              renderItem={({ item }) => <SubCategory item={item} />}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
            />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Ensure items are laid out in rows
    flexWrap: 'wrap',
    paddingTop:50,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});
