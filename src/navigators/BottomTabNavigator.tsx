import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsParamList} from './type';
import BottomTabBar from 'components/bottom-tabs-navigator/BottomTabBar';
import HomeTabScreen from 'screens/home-tab/HomeTabScreen';
import MainTabScreen from 'screens/main-tab/MainTabScreen';
import SettingsTabScreen from 'screens/settings-tab/SettingsTabScreen';

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={BottomTabBar}>
      <Tabs.Screen name="HomeScreen" component={HomeTabScreen} />
      <Tabs.Screen name={'MainScreen'} component={MainTabScreen} />
      <Tabs.Screen name="SettingsScreen" component={SettingsTabScreen} />
    </Tabs.Navigator>
  );
}
