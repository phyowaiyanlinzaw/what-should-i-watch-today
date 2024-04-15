import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {COLORS} from 'utils/color';

export default function GenreItem({
  name,
  icon,
  isSelected,
}: {
  name: string;
  icon: React.JSX.Element;
  isSelected: boolean;
}) {
  return (
    <BlurView
      blurType="dark"
      blurAmount={10}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: isSelected ? COLORS.bluish : COLORS.blackish_1,
        height: 90,
        width: 90,
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
      <Text
        style={{
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {name}
      </Text>
    </BlurView>
  );
}
