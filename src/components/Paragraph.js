import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { LogBox } from 'react-native';

export default function Paragraph(props) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})
