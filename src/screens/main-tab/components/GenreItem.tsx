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
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: COLORS.blackish_1,
        height: 100,
        width: 100,
        borderRadius: 10,
      }}>
      <View
        style={{
          height: 50,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </View>
      <Text style={{color: 'white'}}>{name}</Text>
    </View>
  );
}
