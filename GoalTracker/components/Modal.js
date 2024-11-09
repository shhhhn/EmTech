import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ModalComponent = ({
  visible,
  animationType = 'slide',
  transparent = true,
  onRequestClose,
  title,
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onRequestClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onConfirm ? (
              <>
                <Button title="Cancel" onPress={onRequestClose} />
                <Button title="OK" onPress={onConfirm} />
              </>
            ) : (
              <Button title="OK" onPress={onClose} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalMessage: {
    marginVertical: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ModalComponent;
