import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function ClearInput({ onPress }) {
    return (
        <TouchableOpacity style={styles.clearButton} onPress={onPress}>
            <Text style={{ color: 'white' }}>Clear Goals</Text>
        </TouchableOpacity>
    );
}

export default ClearInput;

const styles = StyleSheet.create({
    clearButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
});
