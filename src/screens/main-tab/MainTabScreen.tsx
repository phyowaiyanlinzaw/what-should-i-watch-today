import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BottomTabBarScreenProps} from 'navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';
import ReactNativeModal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import useMoviesByGenres from './hooks/useMoviesByGenres';
import {MovieListResponse} from 'src/@types/tmdb/declarations';
import ActionIcon from 'assets/svg/genres/action.svg';
import AdventureIcon from 'assets/svg/genres/adventure.svg';
import AnimationIcon from 'assets/svg/genres/animation.svg';
import ComedyIcon from 'assets/svg/genres/comedy.svg';
import CrimeIcon from 'assets/svg/genres/crime.svg';
import DocumentaryIcon from 'assets/svg/genres/documentary.svg';
import DramaIcon from 'assets/svg/genres/drama.svg';

import FamilyIcon from 'assets/svg/genres/family.svg';
import FantasyIcon from 'assets/svg/genres/fantasy.svg';
import HistoryIcon from 'assets/svg/genres/history.svg';
import HorrorIcon from 'assets/svg/genres/horror.svg';
import MusicIcon from 'assets/svg/genres/music.svg';
import MysteryIcon from 'assets/svg/genres/mystery.svg';
import RomanceIcon from 'assets/svg/genres/romance.svg';
import ScienceFictionIcon from 'assets/svg/genres/science-fiction.svg';
import ThrillerIcon from 'assets/svg/genres/thriller.svg';
import TVMovieIcon from 'assets/svg/genres/tv-movie.svg';
import WarIcon from 'assets/svg/genres/war.svg';
import WesternIcon from 'assets/svg/genres/western.svg';
import GenreItem from './components/GenreItem';
import SuggestionIcon from 'assets/svg/genres/suggestion.svg';
import MainFilledIcon from 'assets/svg/bottom-tabs/camera-filled.svg';
import MovieCard from './components/MovieCard';
import {useLoadingModalStore} from 'stores/useLoadingModalStore';

const icons = [
  <ActionIcon height="100%" width="100%" />,
  <AdventureIcon height="100%" width="100%" />,
  <AnimationIcon height="100%" width="100%" />,
  <ComedyIcon height="100%" width="100%" />,
  <CrimeIcon height="100%" width="100%" />,
  <DocumentaryIcon height="100%" width="100%" />,
  <DramaIcon height="100%" width="100%" />,
  <FamilyIcon height="100%" width="100%" />,
  <FantasyIcon height="100%" width="100%" />,
  <HistoryIcon height="100%" width="100%" />,
  <HorrorIcon height="100%" width="100%" />,
  <MusicIcon height="100%" width="100%" />,
  <MysteryIcon height="100%" width="100%" />,
  <RomanceIcon height="100%" width="100%" />,
  <ScienceFictionIcon height="100%" width="100%" />,
  <TVMovieIcon height="100%" width="100%" />,
  <ThrillerIcon height="100%" width="100%" />,

  <WarIcon height="100%" width="100%" />,
  <WesternIcon height="100%" width="100%" />,
];

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

  const openLoading = useLoadingModalStore(state => state.openLoading);

  useEffect(() => {
    // setShowModal(true);
    openLoading();
  }, []);

  /* useFocusEffect(
    React.useCallback(() => {
      setShowModal(true);
    }, []),
  );  */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.blackish_2,
        alignItems: 'center',
        paddingVertical: 20,
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
            justifyContent: 'space-around',
          }}>
          {genresList?.map(genre => (
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
                height: scale(50),
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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.bluish,
                padding: 20,
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 10,
                marginTop: 30,
                width: scale(150),
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
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                padding: 20,
                borderColor: COLORS.bluish,
                borderWidth: 1,
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 10,
                marginTop: 30,
                width: scale(100),
              }}
              onPress={() => {
                setShowModal(false);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
      <View
        style={{
          width: '100%',
        }}>
        <FlatList
          horizontal
          style={{
            padding: 20,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
          showsHorizontalScrollIndicator={false}
          data={genresList}
          renderItem={({item, index}) => {
            return index !== 0 ? (
              <GenreItem name={item.name} icon={icons[index]} />
            ) : (
              <GenreItem
                name={'Random'}
                icon={<SuggestionIcon height="100%" width="100%" />}
              />
            );
          }}
        />
        {moviesByGenres?.results &&
          (moviesByGenres.results.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                gap: 10,
              }}
              style={{
                padding: 20,
              }}
              data={moviesByGenres.results}
              renderItem={item => {
                return (
                  <MovieCard
                    description={item.item.overview}
                    title={item.item.title}
                    image={item.item.poster_path}
                    rating={item.item.vote_average}
                  />
                );
              }}
            />
          ) : (
            <Text style={{color: 'white', fontSize: 24}}>
              'No movies found. Please Select Genre First'
            </Text>
          ))}
      </View>
      <TouchableHighlight
        style={{
          borderColor: COLORS.bluish,
          borderWidth: 1,

          width: scale(80),
          backgroundColor: COLORS.blackish_1,
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          bottom: 40,
          marginLeft: 'auto',
          marginRight: 'auto',
          left: '50%',
          right: '50%',
          transform: [{translateX: -50}],
          height: scale(80),
          flex: 1,
          elevation: 6,
          borderRadius: 100 / 2,
          shadowColor: COLORS.blackish_1,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        }}
        onPress={() => {
          setShowModal(true);
        }}
        underlayColor={COLORS.blackish_1}>
        <MainFilledIcon width={scale(24)} height={verticalScale(24)} />
        {/* <TabBarComponent
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      /> */}
      </TouchableHighlight>
    </SafeAreaView>
  );
}
