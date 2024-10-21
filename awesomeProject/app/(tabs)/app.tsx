import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState<string>('');
  const [courseGoals, setCourseGoals] = useState<string[]>([]);

  function goalInputHandler(enteredText: string) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    console.log(enteredGoalText);
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      enteredGoalText,
    ]);
    setEnteredGoalText('');
  }

  function clearGoalsHandler() {
    setCourseGoals([]); // Clear the array
  }

  return (
    <ImageBackground
      source={require('@/assets/images/21.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>TEAM 14</Text>
          <Text style={styles.subtitleText}>EMPAYNADO  MORALES  PINEDA</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Course Goal"
            style={styles.textInput}
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          {/* Custom TouchableOpacity Button */}
          <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
            <Text style={styles.addButtonText}>Add Goal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goalsContainer}>
          <View style={styles.goalsShade}>
            <Text style={styles.text}>List of Goals</Text>
            {courseGoals.map((goal, index) => (
              <View key={index} style={styles.goalItem}>
                <Text style={styles.goalText}>{goal}</Text>
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.clearButtonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={clearGoalsHandler}>
            <Text style={{ color: 'white' }}>Clear Goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  subtitleText: {
    fontSize: 10,
    color: '#fff',
  },

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
    flex: 1,
  },

  goalsContainer: {
    flex: 5,
    marginTop: 20,
    justifyContent: 'flex-end',
  },

  goalsShade: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 20,
    height: 500,
  },

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

  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
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

  clearButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flex: 1,
    paddingLeft: 0,
  },

  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  }
});
