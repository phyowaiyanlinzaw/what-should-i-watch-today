import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export type AppStackParamList = {
  BottomTabsScreens: NavigatorScreenParams<BottomTabsParamList>;
};

export type BottomTabsParamList = {
  HomeScreen: undefined;
  MainScreen: undefined;
  SettingsScreen: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export type BottomTabBarScreenProps<T extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;
