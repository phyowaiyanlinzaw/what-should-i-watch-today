import {View, Text, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import {BottomTabBarScreenProps} from 'navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';

type Props = BottomTabBarScreenProps<'MainScreen'>;

export default function MainTabScreen({}: Props) {
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
        Main Screen
      </Text>
    </SafeAreaView>
  );
}
