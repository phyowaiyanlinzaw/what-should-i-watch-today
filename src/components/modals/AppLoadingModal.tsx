import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

export default function AppLoadingModal({show = false}: {show: boolean}) {
  return (
    <Modal
      isVisible={show}
      backdropOpacity={0.8}
      style={{
        margin: 0,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            width: 300,
            height: 300,
          }}
          source={require('assets/lotties/loading.json')}
          useNativeLooping
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
}
