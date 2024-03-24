import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomTabBarScreenProps} from 'navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';
import ReactNativeModal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import useMoviesByGenres from './hooks/useMoviesByGenres';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

type Props = BottomTabBarScreenProps<'MainScreen'>;

export default function MainTabScreen({}: Props) {
  const {genresList} = useGetGenresList();
  const [selectedGenres, setSelectedGenres] = useState([0]);
  const [showModal, setShowModal] = useState(false);

  const {getMoviesByGenres} = useMoviesByGenres();

  const [moviesByGenres, setMoviesByGenres] = useState<MovieListResponse>();

  const handleGenreSelect = (genreId: number) => {
    if (selectedGenres && selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setShowModal(true);
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.blackish_2,
        alignItems: 'center',
      }}>
      <ReactNativeModal
        isVisible={showModal}
        style={{
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        backdropOpacity={0.8}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'black',
          }}>
          {genresList?.slice(0, 18).map(genre => (
            <Pressable
              key={genre.id}
              style={{
                borderRadius: 10,
                backgroundColor: selectedGenres?.includes(genre.id)
                  ? COLORS.bluish
                  : 'black',
                padding: 10,
                margin: 5,
                width: scale(100),
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth:
                  selectedGenres && selectedGenres.includes(genre.id) ? 0 : 1,
                height: 75,
              }}
              onPress={() => {
                handleGenreSelect(genre.id);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                {genre.name}
              </Text>
            </Pressable>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.bluish,
              padding: 20,
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 10,
              marginTop: 30,
            }}
            onPress={() => {
              setShowModal(false);
              getMoviesByGenres(selectedGenres).then(response => {
                setMoviesByGenres(response);
              });
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Suggest Me
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {moviesByGenres?.results && (
          <Text style={{color: 'white', fontSize: 24}}>
            {moviesByGenres.results.length > 0
              ? moviesByGenres.results.map(movie => movie.title).join(', ')
              : 'No movies found. Please Select Genre First'}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
