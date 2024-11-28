import { Alert } from 'react-native';

export default function deleteMessageAlert(message, onDelete) {
  if (message.type === 'text') {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(message.id),
        },
      ]
    );
  } else {
    console.log(`Message pressed: ${message.id}`);
  }
}
