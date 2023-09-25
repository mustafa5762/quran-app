import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FirstParagraphHTMLView from './firstPara' 
import { router } from 'expo-router'


const ArticleCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`articledetail/${item._id}`)}>
      <Text style={styles.title}>{item.title}</Text>
      <FirstParagraphHTMLView htmlContent={item.content} />
      <View style={styles.bottomButtons}>
        <View style={styles.volumeButton}>
          <Image
            source={require('../assets/volume.png')}
            style={{ width: 18, height: 18 }}
          />
          <Text style={styles.volumeText}>Click Here To Listen Audio</Text>
        </View>
        <View>
          <Image
            source={require('../assets/share.png')}
            style={{ width: 18, height: 18 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleCard

const styles = StyleSheet.create({
    card: {
        marginBottom: 25,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#65a30d'
    },
    bottomButtons: {
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingTop: 20
    },
    volumeButton: {
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'     
    },
    volumeText: {
      color: '#65a30d',
      fontSize: 12,
      marginLeft: 7
    }
})