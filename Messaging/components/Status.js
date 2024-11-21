import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';

export default class Status extends React.Component {
  state = {
    isConnected: true, // Assume connected by default
  };

  componentDidMount() {
    // Get the initial network connection status
    this.checkNetworkConnection();

    // Subscribe to network status updates
    this.unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  componentWillUnmount() {
    // Unsubscribe from network status updates
    this.unsubscribeNetInfo();
  }

  checkNetworkConnection = async () => {
    try {
      const { isConnected } = await NetInfo.getConnectionInfo();
      this.setState({ isConnected });
    } catch (error) {
      console.error('Error checking network connection:', error);
    }
  };

  render() {
    const { isConnected } = this.state;
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});