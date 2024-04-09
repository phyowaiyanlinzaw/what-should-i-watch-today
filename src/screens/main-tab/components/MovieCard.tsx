import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from 'utils/color';
import FastImage from 'react-native-fast-image';
import {verticalScale} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';

export default function MovieCard({
  title,
  description,
  image,
  rating,
}: {
  title: string;
  description: string;
  image: string;
  rating: number;
}) {
  const [fetchingImage, setFetchingImage] = React.useState(true);

  return (
    <>
      {fetchingImage && (
        <ActivityIndicator
          size="small"
          color={COLORS.bluish}
          style={{
            width: '100%',
            flexDirection: 'row',
            height: 200,
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 10,
            backgroundColor: COLORS.blackish_1,
          }}
        />
      )}
      <BlurView
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
        style={{
          backgroundColor: COLORS.blackish_1,
          width: '100%',
          flexDirection: 'row',
          height: 200,
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 10,
        }}>
        <FastImage
          source={{
            uri: `https://image.tmdb.org/t/p/original${image}`,
          }}
          style={{
            width: 130,
            height: 200,
          }}
          onLoad={() => {
            setFetchingImage(false);
          }}
        />

        <View
          style={{
            flex: 1,
            padding: 10,
            gap: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: COLORS.bluish,
                fontSize: 20,
                fontWeight: 'bold',
                width: '80%',
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: rating >= 7 ? 'green' : 'red',
                fontSize: 15,
                fontWeight: 'bold',
                borderRadius: 5,
                padding: 5,
                backgroundColor: COLORS.blackish_1,
                borderColor: rating >= 7 ? 'green' : 'red',
                borderWidth: 1,
              }}>
              {rating?.toFixed(1)}
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.greyish,
              fontSize: 14,
              height: 150,
              width: '100%',
              fontWeight: '500',
            }}>
            {description}
          </Text>
        </View>
      </BlurView>
    </>
  );
}
