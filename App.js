import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  UserLocation,
  VideoLocation,
  Dashboard,
  UserTracker,
  VideoRecorder
} from './src/screens'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Drawer.Screen name="Home" component={StartScreen} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="UserLocation" component={UserLocation} />
          {/* <Drawer.Screen name="VideoLocation" component={VideoLocation} /> */}
          <Drawer.Screen name="VideoRecorder" component={VideoRecorder} />
          <Drawer.Screen name="UserTracker" component={UserTracker} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
