import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = (item) => item.id.toString();
const { width, height } = Dimensions.get('window');

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    onDeleteMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  state = {
    isImageVisible: false,
    selectedImageUri: null,
  };

  handlePressMessage = (message) => {
    const { onPressMessage, onDeleteMessage } = this.props;

    if (message.type === 'text') {
      this.showDeleteMessageAlert(message.id, onDeleteMessage);
    } else if (message.type === 'image') {
      // Toggle full-screen image
      if (this.state.isImageVisible && this.state.selectedImageUri === message.uri) {
        this.closeImageModal();
      } else {
        this.setState({ isImageVisible: true, selectedImageUri: message.uri });
      }
    } else {
      onPressMessage(message);
    }
  };

  showDeleteMessageAlert = (messageId, onDeleteMessage) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteMessage(messageId) },
      ],
      { cancelable: true }
    );
  };

  closeImageModal = () => {
    this.setState({ isImageVisible: false, selectedImageUri: null });
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case 'image':
        return (
          <TouchableOpacity onPress={() => this.handlePressMessage({ type, uri })}>
            <Image style={styles.image} source={{ uri }} />
          </TouchableOpacity>
        );
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}
          >
            <Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return null;
    }
  };

  renderMessageContent = (item) => {
    return (
      <View style={styles.messageRow}>
        <TouchableOpacity onPress={() => this.handlePressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { messages } = this.props;
    const { isImageVisible, selectedImageUri } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          inverted
          data={messages}
          renderItem={({ item }) => this.renderMessageContent(item)}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
        />

        {/* Modal for full-screen image */}
        <Modal
          visible={isImageVisible}
          transparent={false}
          onRequestClose={this.closeImageModal}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={this.closeImageModal}>
            <Image style={styles.fullScreenImage} source={{ uri: selectedImageUri }} resizeMode="contain" />
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 40,
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 8,
  },
  map: {
    height: 200,
    width: 200,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});