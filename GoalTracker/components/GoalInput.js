import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';


function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [pressState, setPressState] = useState('');
    
    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText); 
    }

    function addGoalHandler() {
        setPressState('Goal Added!');
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
            {/*
            <TouchableOpacity
                style={styles.addButton} 
                onPress={addGoalHandler} 
            >
                <Text style={styles.addButtonText}>Add Goal</Text>
            </TouchableOpacity>
            */}

            
            <Pressable onPress={() => addGoalHandler('onPress')}>
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            

            {/*
            <Pressable onPressIn={() => addGoalHandler('onPressIn')}>
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

            {/*
            <Pressable onPressOut={() => addGoalHandler('onPressOut')}>
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

            {/*
            <Pressable onLongPress={() => addGoalHandler('onLongPress')}>
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

            {/*
            <Pressable 
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'gray' : 'black',
                    },
                    { padding: 10, borderRadius: 5 }
                ]}
                onPress={() => addGoalHandler('Dynamic')}>

                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

            {/*
            <Pressable 
                onPress={() => addGoalHandler('HitSlop')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

            {/*
            <Pressable 
                onPress={() => addGoalHandler('Ripple')}
                android_ripple={{ color: 'lightblue', borderless: true }}
            >
                <Text style={styles.addButtonText}>Add Goal</Text>
            </Pressable>
            */}

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

    addButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },

    addButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

});
