import {GenresListResponse} from 'api/queries/getMovieGenresList';
import React from 'react';
import {View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {COLORS} from 'utils/color';

export default function GenresDropdown({genres}: GenresListResponse) {
  return (
    <View
      style={{
        width: '80%',
        marginTop: 20,
      }}>
      <MultiSelect
        data={genres.map(genre => ({label: genre.name, value: genre.id}))}
        labelField="label"
        onChange={selectedGenre => console.log(selectedGenre)}
        valueField="value"
        style={{
          backgroundColor: COLORS.blackish_2,
        }}
        onChangeText={() => {
          console.log('onChangeText');
        }}
        itemContainerStyle={{
          backgroundColor: COLORS.blackish_2,
        }}
        itemTextStyle={{
          color: COLORS.bluish,
        }}
        containerStyle={{
          backgroundColor: COLORS.blackish_2,
        }}
        placeholderStyle={{
          color: COLORS.greyish,
        }}
      />
    </View>
  );
}
