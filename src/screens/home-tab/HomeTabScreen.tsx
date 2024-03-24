import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BottomTabBarScreenProps} from '../../navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';
import GenresDropdown from 'screens/main-tab/components/GenresDropdown';

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
