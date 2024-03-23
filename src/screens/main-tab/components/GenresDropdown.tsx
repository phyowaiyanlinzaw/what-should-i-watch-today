import {GenresListResponse} from 'api/queries/getMovieGenresList';
import React from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

export default function GenresDropdown({genres}: GenresListResponse) {
  return (
    <View
      style={{
        width: '80%',
        marginTop: 20,
      }}>
      <Dropdown
        data={genres.map(genre => ({label: genre.name, value: genre.id}))}
        labelField="label"
        onChange={selectedGenre => console.log(selectedGenre)}
        valueField="value"
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
        }}
        itemContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
        }}
      />
    </View>
  );
}
