import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Text, View} from 'react-native';
import {COLORS} from 'utils/color';

export default function GenreItem({
  name,
  icon,
}: {
  name: string;
  icon: React.JSX.Element;
}) {
  return (
    <BlurView
      blurType="dark"
      blurAmount={10}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: COLORS.blackish_1,
        height: 80,
        width: 80,
        borderRadius: 10,
      }}>
      <View
        style={{
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </View>
      <Text style={{color: 'white', fontSize: 12}}>{name}</Text>
    </BlurView>
  );
}
