import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, Platform, FlatList, ScrollView, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import ClearInput from './components/ClearInput';
import Modal from './components/Modal';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const openWarningModal = () => setWarningModalVisible(true);
  const closeWarningModal = () => setWarningModalVisible(false);

  const openConfirmModal = (goalKey) => {
    setGoalToDelete(goalKey);
    setConfirmModalVisible(true);
};
const closeConfirmModal = () => setConfirmModalVisible(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => {
        const updatedGoals = [...currentCourseGoals, { text: enteredGoalText, key: Math.random().toString() }];
        if (updatedGoals.length > 5) {
            setWarningModalVisible(true);
        }
        return updatedGoals;
    });
}


function deleteGoalHandler(goalKey) {
    Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this goal?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => {
                setCourseGoals((currentCourseGoals) =>
                    currentCourseGoals.filter((goal) => goal.key !== goalKey)
                );
            } }
        ]
    );
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
              renderItem={({ item }) => (
                <GoalItem
                  text={item.text}
                  onDelete={() => deleteGoalHandler(item.key)}
                />
              )}
              keyExtractor={(item) => item.key}
            />
          </View>

          <View style={styles.clearButtonContainer}>
            <ClearInput onPress={clearGoalsHandler} />
          </View>

          {/* Warning Modal */}
          <Modal
            visible={isWarningModalVisible}
            title="Warning"
            message="You have added more than 5 goals. Consider reducing your list!"
            onClose={closeWarningModal}
          />

          {/* Confirmation Modal */}
          <Modal
            visible={isConfirmModalVisible}
            title="Confirm Deletion"
            message="Are you sure you want to delete this goal?"
            onRequestClose={closeConfirmModal}
            onConfirm={deleteGoalHandler}
          />

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
    marginBottom: 20,
  },
});
