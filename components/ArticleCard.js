import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FirstParagraphHTMLView from './firstPara' 
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Share } from 'react-native';



const ArticleCard = ({item}) => {

  const url = 'https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US'
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          ('Instagram | A time wasting application'+ '\n'+ url )
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/articledetail/${item._id}`)}>
      <Text style={styles.title}>{item.title}</Text>
      <FirstParagraphHTMLView htmlContent={item.content} />
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.volumeButton}>
          <Ionicons name="volume-high-outline" size={20} color="#16a34a" style={styles.icon} />
          <Text style={styles.volumeText}>Click Here To Listen Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={20} color="#16a34a" style={styles.icon} />
        </TouchableOpacity>
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
        fontWeight: '900',
        color: '#16a34a'
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
      color: '#16a34a',
      fontSize: 12,
      marginLeft: 7,
      fontWeight: '500'
    }
})