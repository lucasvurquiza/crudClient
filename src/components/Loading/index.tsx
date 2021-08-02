import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

export const Loading = () => {
  return (
    <Modal transparent visible>
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
