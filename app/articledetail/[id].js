import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useApiFetch from '../../hooks/useApiFetch';
import RichTextRenderer from '../../components/ContentRenderer';
import { useGlobalState } from '../../GlobalStateContext';
import { Ionicons } from '@expo/vector-icons';


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
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{data.article.title}</Text>
            <TouchableOpacity style={styles.volumeButton} onPress={() => setName(data.article.audio)}>
              <Ionicons name="volume-high-outline" size={20} color="#16a34a" style={styles.icon} />
              <Text style={styles.volumeText}>Click Here To Listen Audio</Text>
            </TouchableOpacity>
            <View style={styles.content}>
              <RichTextRenderer content={data.article.content} />
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:70,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#16a34a',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    paddingBottom: 15,
},
volumeButton: {
  display:'flex',
  flexDirection: 'row',
  alignItems: 'center' ,
  marginTop: 20,    
  paddingVertical: 10,
},
volumeText: {
  color: '#16a34a',
  fontSize: 14,
  marginLeft: 7,
  fontWeight: '500'
},
});