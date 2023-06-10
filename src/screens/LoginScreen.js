import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { LogBox } from 'react-native';

const LOCAL_BASEURL= 'http://localhost:5226/Account/login'
const AZURE_BASEURL= 'https://rcu.azurewebsites.net/Account/login'
export default function LoginScreen({ navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async (e) => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const headerOptions = new Headers()
    headerOptions.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8'
    )
    headerOptions.append(
      'Access-Control-Allow-Origin',
      'http://localhost:19006'
    )
    headerOptions.append('Access-Control-Allow-Credentials', 'true')
    headerOptions.append('GET', 'POST', 'OPTIONS')
    const dataToSend = {
      Email: email.value,
      Password: password.value,
      returnUrl: 'http://localhost:19006/',
    }
    let formBody = []
    for (const key in dataToSend) {
      if (Object.hasOwn(dataToSend, key)) {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(dataToSend[key])
        formBody.push(encodedKey + '=' + encodedValue)
      }
    }

    formBody = formBody.join('&')
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: headerOptions,
      body: formBody,
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'UserLocation' }],
    })
    // const response = await fetch(
    //   LOCAL_BASEURL,
    //   requestOptions
    // )
    // try{
    //   const data = await response.json()
    //   if (data !== null && data.success === 'SUCCESS') {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'UserLocation' }],
    //     })
    //   }
    //   else{
    //     <Alert />
    //   }
    // }
    // catch(error){
    //   console.log(error)
    //   throw error
    // }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
