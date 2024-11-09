import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function GoalItem ({ text, onDelete }) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{text}</Text>
            <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
                <MaterialIcons name="remove-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    );
};
export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10,
    },
    goalText: {
        color: 'white',
        flex: 1, 
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        marginTop: 5,
    },
    deleteIcon: {
        marginLeft: 10, 
    },
});