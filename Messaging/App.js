import React from 'react';
import { View, StyleSheet, BackHandler, StatusBar, Text, Image, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import MessageList from './components/MessageList';
import deleteMessageAlert from './utils/DeleteMessage';
import { createTextMessage, createImageMessage, createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        createImageMessage('https://unsplash.it/300/300'),
        createTextMessage('World'),
        createTextMessage('Hello'),
        createLocationMessage({
          latitude: 37.78825,
          longitude: -122.4324,
        }),
      ],
      fullscreenImageId: null, // Track which image is fullscreen
      newMessage: '', // Track new message input
    };
  }

  componentWillMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    });
  }

  componentWillUnmount() {
    this.subscription.remove(); // Clean up event listener
  }

  handlePressMessage = (message) => {
    deleteMessageAlert(message, this.deleteMessage);
  };

  deleteMessage = (id) => {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((message) => message.id !== id),
    }));
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  sendMessage = () => {
    if (this.state.newMessage.trim()) {
      const newMsg = createTextMessage(this.state.newMessage);
      this.setState((prevState) => ({
        messages: [...prevState.messages, newMsg],
        newMessage: '', // Clear the input field
      }));
    }
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={(id) => this.setState({ fullscreenImageId: id })} // Set fullscreen image ID on image press
          onDeleteMessage={this.deleteMessage} // Pass deleteMessage here
        />
      </View>
    );
  }

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find((message) => message.id === fullscreenImageId);
    if (!image) return null;

    const { uri } = image;
    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Shenia E</Text>
      </View>
    );
  }

  renderInput() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={this.state.newMessage}
          onChangeText={(text) => this.setState({ newMessage: text })}
        />
        <TouchableOpacity onPress={this.sendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {this.renderHeader()}
        {this.renderMessageList()}
        {this.renderInput()}
        {this.renderFullscreenImage()} {/* Call to render fullscreen image */}
      </View>
    );
  }
}

// Component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    color: '#6200EE',
    fontWeight: 'bold',
  },
});