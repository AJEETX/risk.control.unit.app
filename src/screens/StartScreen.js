import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { LogBox } from 'react-native';

export default function StartScreen({ navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
  return (
    <Background>
      <Logo />
      <Header>risk.control.unit</Header>
      <Paragraph>
        The easiest way to track and report the investigation.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Sign-in
      </Button>
    </Background>
  )
}
