import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, Platform, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import ClearInput from './components/ClearInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => 
      [...currentCourseGoals, 
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
  }

  function clearGoalsHandler() {
    setCourseGoals([]); // Clear the array
  }

  return (
    <ImageBackground
      source={require('./assets/21.jpg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.appContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>TEAM 14</Text>
            <Text style={styles.subtitleText}>EMPAYNADO MORALES PINEDA</Text>
          </View>

          <GoalInput onAddGoal={addGoalHandler} />

          <Text style={styles.listHeaderText}>List of Goals</Text>

{/*
         <ScrollView style={styles.goalsShade}>
          <Text style={styles.text}>List of Goals</Text>
          {courseGoals.map((goal) => (
            <GoalItem key={goal.key} text={goal.text} />
          ))}
        </ScrollView>
*/}        

          <View style={styles.goalsShade}>
            <FlatList
              data={courseGoals}
              renderItem={({ item }) => <GoalItem text={item.text} />}
              keyExtractor={(item) => item.key}
            />
          </View>

          <View style={styles.clearButtonContainer}>
            <ClearInput onPress={clearGoalsHandler} />
          </View>
        </View>
      </KeyboardAvoidingView>
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

  goalsShade: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 20,
    height: 300,
    marginBottom: 15,
    marginTop: 5,
  },

  listHeaderText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginTop: 5,
    alignSelf: 'left',
  },

  clearButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },

  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
