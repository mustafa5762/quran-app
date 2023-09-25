import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useApiFetch from '../../hooks/useApiFetch';
import RichTextRenderer from '../../components/ContentRenderer';
import { useGlobalState } from '../../GlobalStateContext';


export default function Page() {
  const { id } = useLocalSearchParams();

  const { state, dispatch } = useGlobalState();

  const setName = (name) => {
    dispatch({ type: 'SET_NAME', payload: name });
  };

  const apiUrl = `https://drab-pear-bunny-belt.cyclic.cloud/api/article/${id}`; // Replace with your API URL
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
        <ScrollView>
            <Text style={styles.title}>{data.article.title}</Text>
            <TouchableOpacity onPress={() => setName(data.article.audio)}>
               <Text>My Name {state.name}</Text>
            </TouchableOpacity>
            <RichTextRenderer content={data.article.content} />
        </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#65a30d'
},
});