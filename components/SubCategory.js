import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'



const SubCategory = ({item}) => {

  const handlePress = () => {
    if (item.hasSubcategories) {
      router.replace(`/category/${item._id}`)
    }
    else {
      router.push(`/article/${item._id}`)
    }
  }

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
      <Text style={{fontFamily: 'AlQalam Shamil.ttf',color:'#171717',fontSize: 20}}>{item.name.ur}</Text>
    </TouchableOpacity>
  )
}

export default SubCategory

const styles = StyleSheet.create({
    wrapper: {
        width:'50%',
        backgroundColor: '#fff',
        height: 100,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
})