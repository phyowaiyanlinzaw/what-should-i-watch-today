import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BottomTabBarScreenProps} from 'navigators/type';
import {COLORS} from 'utils/color';
import useGetGenresList from 'hooks/useGetGenresList';
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
import PopularIcon from 'assets/svg/genres/popular.svg';
import MainFilledIcon from 'assets/svg/bottom-tabs/camera-filled.svg';
import MovieCard from './components/MovieCard';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import useGetPopularMovies from './hooks/useGetPopularMovies';
import PlusIcon from 'assets/svg/filter/plus.svg';
import MinusIcon from 'assets/svg/filter/minus.svg';

const icons = [
  <ActionIcon height="100%" width="100%" color={COLORS.bluish} />,
  <AdventureIcon height="100%" width="100%" color={COLORS.bluish} />,
  <AnimationIcon height="100%" width="100%" color={COLORS.bluish} />,
  <ComedyIcon height="100%" width="100%" color={COLORS.bluish} />,
  <CrimeIcon height="100%" width="100%" color={COLORS.bluish} />,
  <DocumentaryIcon height="100%" width="100%" color={COLORS.bluish} />,
  <DramaIcon height="100%" width="100%" color={COLORS.bluish} />,
  <FamilyIcon height="100%" width="100%" color={COLORS.bluish} />,
  <FantasyIcon height="100%" width="100%" color={COLORS.bluish} />,
  <HistoryIcon height="100%" width="100%" color={COLORS.bluish} />,
  <HorrorIcon height="100%" width="100%" color={COLORS.bluish} />,
  <MusicIcon height="100%" width="100%" color={COLORS.bluish} />,
  <MysteryIcon height="100%" width="100%" color={COLORS.bluish} />,
  <RomanceIcon height="100%" width="100%" color={COLORS.bluish} />,
  <ScienceFictionIcon height="100%" width="100%" color={COLORS.bluish} />,
  <TVMovieIcon height="100%" width="100%" color={COLORS.bluish} />,
  <ThrillerIcon height="100%" width="100%" color={COLORS.bluish} />,
  <WarIcon height="100%" width="100%" color={COLORS.bluish} />,
  <WesternIcon height="100%" width="100%" color={COLORS.bluish} />,
];

type FilterType = {
  genre: number;
  rating: number;
  isAdult: boolean;
};

type Props = BottomTabBarScreenProps<'MainScreen'>;

export default function MainTabScreen({}: Props) {
  const {genresList, isLoadingGenres} = useGetGenresList();

  const genreIcons = [
    {
      icon: <PopularIcon height="100%" width="100%" color={COLORS.bluish} />,
      id: 0,
      name: 'Popular',
    },
    ...icons.map((icon, index) => ({
      icon,
      id: genresList?.[index]?.id,
      name: genresList?.[index]?.name,
    })),
  ];

  const [selectedGenre, setSelectedGenre] = useState(0);

  const handleSelectGenre = (genreId: number) => {
    setSelectedGenre(genreId);
  };

  const {getMoviesByGenres} = useMoviesByGenres();

  const {popularMovies, refetchPopularMovies} = useGetPopularMovies();

  const [moviesList, setMoviesList] = useState<MovieListResponse>();

  useEffect(() => {
    setMoviesList(popularMovies);
  }, [popularMovies]);

  const genreFlatListRef = useRef<FlatList>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  const [filterState, setFilterState] = useState<FilterType>({
    genre: 0,
    rating: 0,
    isAdult: false,
  });

  return (
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
            data={genreIcons}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    handleSelectGenre(item.id);
                    getMoviesByGenres(item.id).then(response => {
                      setMoviesList(response);
                    });
                  }}>
                  <GenreItem
                    name={item.name}
                    icon={genreIcons[index].icon}
                    isSelected={selectedGenre === item.id}
                  />
                </Pressable>
              );
            }}
          />
        ) : (
          <ActivityIndicator size="large" color={COLORS.bluish} />
        )}
        {moviesList?.results &&
          (moviesList.results.length > 0 ? (
            <FlatList
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                gap: 10,
              }}
              style={{
                padding: 20,
              }}
              data={moviesList.results}
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
        handleComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SuggestionIcon
                  height={scale(24)}
                  width={scale(24)}
                  color={COLORS.bluish}
                />
              </View>
              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                }}
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.bluish,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Close
                </Text>
              </Pressable>
            </View>
          );
        }}
        handleStyle={{
          backgroundColor: COLORS.blackish_1,
          borderRadius: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.bluish,
        }}
        backgroundStyle={{
          backgroundColor: COLORS.blackish_1,
        }}
        style={{
          borderRadius: 20,
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
            padding: 10,
            borderRadius: 10,
            backgroundColor: COLORS.blackish_1,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 20,
              }}>
              Select Genre
            </Text>
            {!isLoadingGenres ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                ListFooterComponent={
                  <View style={{width: 20}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 20,
                      }}>
                      -
                    </Text>
                  </View>
                }
                data={genresList}
                keyExtractor={item => item!.id!.toString()}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      style={{
                        backgroundColor:
                          filterState.genre === item.id
                            ? COLORS.bluish
                            : COLORS.blackish_1,
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setFilterState(prev => {
                          return {
                            ...prev,
                            genre: item.id,
                          };
                        });
                      }}>
                      <Text style={{color: 'white'}}>{item.name}</Text>
                    </Pressable>
                  );
                }}
              />
            ) : (
              <ActivityIndicator size="large" color={COLORS.bluish} />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '600',
                  marginBottom: 20,
                }}>
                Minimum Rating
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setFilterState(prev => {
                      return {
                        ...prev,
                        rating: prev.rating > 0 ? prev.rating - 1 : 0,
                      };
                    });
                  }}>
                  <MinusIcon
                    height={scale(24)}
                    width={scale(24)}
                    color={COLORS.bluish}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                    marginHorizontal: 10,
                  }}>
                  {Math.round(filterState.rating * 10) / 10}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setFilterState(prev => {
                      return {
                        ...prev,
                        rating: prev.rating < 9 ? prev.rating + 1 : 9,
                      };
                    });
                  }}>
                  <PlusIcon
                    height={scale(24)}
                    width={scale(24)}
                    color={COLORS.bluish}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
