import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  UserLocation,
  VideoLocation,
  Dashboard,
  UserTracker
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="UserLocation" component={UserLocation} />
          <Stack.Screen name="VideoLocation" component={VideoLocation} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="UserTracker" component={UserTracker} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
