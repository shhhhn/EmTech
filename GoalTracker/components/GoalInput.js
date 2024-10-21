import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState(''); 
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText); 
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText); 
        setEnteredGoalText(''); 
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Your Course Goal"
                style={styles.textInput}
                onChangeText={goalInputHandler} 
                value={enteredGoalText} 
            />
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={addGoalHandler} 
            >
                <Text style={styles.addButtonText}>Add Goal</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 13,
        width: '70%',
        marginRight: 8,
        color: 'black',
    },
    
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    addButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    
    addButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
