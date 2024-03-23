import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './type';

const Stack = createStackNavigator<AppStackParamList>();

import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';

export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabsScreens"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabsScreens" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
