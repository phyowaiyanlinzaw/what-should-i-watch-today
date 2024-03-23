import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from 'utils/color';

export default function SettingsTabScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.blackish_2,
      }}>
      <Text
        style={{
          color: COLORS.greyish,
        }}>
        Settings Screen
      </Text>
    </SafeAreaView>
  );
}
