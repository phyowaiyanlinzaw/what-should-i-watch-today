import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {BottomTabBarScreenProps} from 'navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';
import ReactNativeModal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
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
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

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
  const {genresList, isLoadingGenres} = useGetGenresList();
  const [selectedGenres, setSelectedGenres] = useState([0]);
  const [showModal, setShowModal] = useState(false);

  const {getMoviesByGenres} = useMoviesByGenres();

  const [moviesByGenres, setMoviesByGenres] = useState<MovieListResponse>();

  const genreFlatListRef = useRef<FlatList>(null);

  const handleGenreSelect = (genreId: number) => {
    if (selectedGenres && selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '74%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    // <BottomSheetModalProvider>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.blackish_2,
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <View
        style={{
          width: '100%',
        }}>
        {!isLoadingGenres ? (
          <FlatList
            ref={genreFlatListRef}
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
        ) : (
          <Text style={{color: 'white', fontSize: 24}}>Loading Genres...</Text>
        )}
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
      <BlurView
        style={{
          position: 'absolute',
          left: '50%',
          right: '50%',
          bottom: 20,
          height: scale(75),
          borderRadius: 90 / 2,
          width: scale(75),
          transform: [{translateX: -50}],
        }}
        blurType="chromeMaterialDark"
        blurAmount={20}
      />
      <TouchableHighlight
        style={{
          width: scale(75),
          flexDirection: 'row',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          bottom: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          left: '50%',
          right: '50%',
          transform: [{translateX: -50}],
          height: scale(75),
          flex: 1,
          elevation: 6,
          borderRadius: 90 / 2,
          shadowColor: COLORS.blackish_1,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        }}
        onPress={() => {
          bottomSheetRef.current?.expand();
        }}
        underlayColor={COLORS.blackish_1}>
        <MainFilledIcon width={scale(24)} height={verticalScale(24)} />
      </TouchableHighlight>

      <BottomSheet
        handleStyle={{
          backgroundColor: 'black',
          borderRadius: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.bluish,
        }}
        backgroundStyle={{
          backgroundColor: 'black',
        }}
        style={{
          backgroundColor: 'black',
        }}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        // handleComponent={() => null}
        // backgroundComponent={() => null}
        // enablePanDownToClose={true}
        onChange={index => {
          console.log('index', index);
        }}>
        <BottomSheetView
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
                getMoviesByGenres(selectedGenres).then(response => {
                  setMoviesByGenres(response);
                });
                bottomSheetRef.current?.close();
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
                bottomSheetRef.current?.close();
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
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
    // </BottomSheetModalProvider>
  );
}
