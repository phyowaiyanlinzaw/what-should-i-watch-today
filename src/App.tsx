import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStackNavigator from './navigators/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from 'utils/color';

export default function App() {
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: COLORS.blackish_2,
        flex: 1,
      }}>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
