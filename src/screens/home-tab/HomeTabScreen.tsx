import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {BottomTabBarScreenProps} from '../../navigators/type';
import {COLORS} from 'utils/color';

type Props = BottomTabBarScreenProps<'HomeScreen'>;

export default function HomeTabScreen({navigation}: Props) {
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
        Home Screen
      </Text>
    </SafeAreaView>
  );
}
