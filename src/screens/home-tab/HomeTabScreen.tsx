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
  const {genresList} = useGetGenresList();
  const [selectedGenres, setSelectedGenres] = useState([0]);

  const handleGenreSelect = (genreId: number) => {
    if (selectedGenres && selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

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
      <GenresDropdown genres={genresList ? genresList : []} />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 20,
        }}>
        {genresList?.map(genre => (
          <Pressable
            key={genre.id}
            style={{
              borderRadius: 10,
              backgroundColor:
                // selectedGenre === genre.id ? COLORS.bluish : COLORS.blackish_1,
                selectedGenres?.includes(genre.id)
                  ? COLORS.bluish
                  : COLORS.blackish_1,
              padding: 10,
              margin: 5,
            }}
            onPress={() => {
              handleGenreSelect(genre.id);
            }}>
            <Text
              style={{
                color:
                  // selectedGenre === genre.id ? COLORS.greyish : COLORS.bluish,
                  selectedGenres?.includes(genre.id)
                    ? COLORS.greyish
                    : COLORS.bluish,
                fontSize: 24,
              }}>
              {genre.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
