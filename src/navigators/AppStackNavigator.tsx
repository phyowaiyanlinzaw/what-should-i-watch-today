import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './type';

const Stack = createStackNavigator<AppStackParamList>();

import React, {useEffect} from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import AppLoadingModal from 'components/modals/AppLoadingModal';
import {useLoadingModalStore} from 'stores/useLoadingModalStore';

export default function AppStackNavigator() {
  const showLoading = useLoadingModalStore(state => state.showLoading);

  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomTabsScreens"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabsScreens" component={BottomTabNavigator} />
      </Stack.Navigator>
      <AppLoadingModal show={showLoading} />
    </>
  );
}
