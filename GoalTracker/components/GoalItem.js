import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function GoalItem ({ text }) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{text}</Text>
            <View style={styles.separator} />
        </View>
    );
};
export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        marginBottom: 10,
    },

    goalText: {
        color: 'white',
    },

    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        marginTop: 5,
    },
});