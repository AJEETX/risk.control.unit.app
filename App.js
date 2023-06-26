import React, { useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';

import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  UserLocation,
  VideoLocation,
  Dashboard,
  UserTracker,
  VideoRecorder,
  LocationMap
} from './src/screens'

const Drawer = createDrawerNavigator()

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])
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
          <Drawer.Screen name="VideoLocation" component={VideoLocation} />
          <Drawer.Screen name="VideoRecorder" component={VideoRecorder} />
          <Drawer.Screen name="UserTracker" component={UserTracker} />
          <Drawer.Screen name="LocationMap" component={LocationMap} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
