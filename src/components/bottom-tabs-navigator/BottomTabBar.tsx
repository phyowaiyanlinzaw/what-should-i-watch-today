import {View, Dimensions, Pressable, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeOutlineIcon from 'assets/svg/bottom-tabs/home-outline.svg';
import MainOutlineIcon from 'assets/svg/bottom-tabs/camera-outline.svg';
import MainFilledIcon from 'assets/svg/bottom-tabs/camera-filled.svg';
import SettingsOutlineIcon from 'assets/svg/bottom-tabs/settings-outline.svg';
import SettingsFilledIcon from 'assets/svg/bottom-tabs/settings-filled.svg';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {HomeFilledIcon} from 'assets/svg/bottom-tabs';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {COLORS} from 'utils/color';

const menus = [
  {
    id: '1',
    icon: (isFocused: boolean) =>
      isFocused ? (
        <HomeFilledIcon width={scale(24)} height={verticalScale(24)} />
      ) : (
        <HomeOutlineIcon width={scale(24)} height={verticalScale(24)} />
      ),
    href: 'HomeScreen',
  },
  {
    id: '2',
    icon: (isFocused: boolean) =>
      isFocused ? (
        <MainFilledIcon width={scale(24)} height={verticalScale(24)} />
      ) : (
        <MainOutlineIcon width={scale(24)} height={verticalScale(24)} />
      ),
    href: 'MainScreen',
  },
  {
    id: '3',
    icon: (isFocused: boolean) =>
      isFocused ? (
        <SettingsFilledIcon width={scale(24)} height={verticalScale(24)} />
      ) : (
        <SettingsOutlineIcon width={scale(24)} height={verticalScale(24)} />
      ),
    href: 'SettingsScreen',
  },
];

type Props = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const {width} = Dimensions.get('window');

const TAB_WIDTH = (width - 40 * 2) / menus.length;

const TabBarComponent = ({state, descriptors, navigation}: Props) => {
  const translateX = useSharedValue(0);
  const focusedTab = state.index;
  const [activeTab, setActiveTab] = useState(state.index);

  const handleAnimate = (index: number) => {
    translateX.value = withTiming(index * TAB_WIDTH, {
      duration: 500,
    });
  };

  useEffect(() => {
    handleAnimate(focusedTab);
  }, [focusedTab]);

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {
            width: TAB_WIDTH,
            height: 40,
            zIndex: 0,
            position: 'absolute',
            marginHorizontal: 20,
            borderTopColor: COLORS.bluish,
            borderTopWidth: 4,
            top: 2,
          },
          rnStyle,
        ]}
      />
      {menus.map((menu, index) => {
        const isFocused = activeTab === index;
        return (
          <Pressable
            key={`route-${index}`}
            onPress={() => {
              setActiveTab(index);
              handleAnimate(index);
              navigation.navigate(menu.href);
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {menu.icon(isFocused)}
          </Pressable>
        );
      })}
    </>
  );
};

export default function BottomTabBar({
  descriptors,
  state,
  insets,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      style={{
        backgroundColor: COLORS.blackish_1,
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        bottom: 40,
        left: 20,
        right: 20,
        height: 60,
        flex: 1,
        elevation: 6,
        borderRadius: 15,
        shadowColor: COLORS.blackish_1,
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 10,
          height: 10,
        },
      }}>
      <TabBarComponent
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    </View>
  );
}
