import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const HomeScreen = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);

  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    setClockInTime(currentTime);
  };

  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    setClockOutTime(currentTime);
  };

  const handleStartBreak = () => {
    const currentTime = new Date().toLocaleTimeString();
    setBreakStartTime(currentTime);
  };

  const handleEndBreak = () => {
    const currentTime = new Date().toLocaleTimeString();
    setBreakEndTime(currentTime);
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={styles.pageTitle}>Work Log</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clock In / Clock Out</Text>
        {clockInTime ? (
          <View style={styles.logContainer}>
            <Text style={styles.logText}>Clock In: {clockInTime}</Text>
            {clockOutTime && <Text style={styles.logText}>Clock Out: {clockOutTime}</Text>}
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleClockIn}>
            <Text style={styles.buttonText}>Clock In</Text>
          </TouchableOpacity>
        )}

        {!clockOutTime && clockInTime && (
          <TouchableOpacity style={styles.button} onPress={handleClockOut}>
            <Text style={styles.buttonText}>Clock Out</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Break</Text>
        {breakStartTime ? (
          <View style={styles.logContainer}>
            <Text style={styles.logText}>Start: {breakStartTime}</Text>
            {breakEndTime && <Text style={styles.logText}>End: {breakEndTime}</Text>}
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleStartBreak}>
            <Text style={styles.buttonText}>Start Break</Text>
          </TouchableOpacity>
        )}

        {!breakEndTime && breakStartTime && (
          <TouchableOpacity style={styles.button} onPress={handleEndBreak}>
            <Text style={styles.buttonText}>End Break</Text>
          </TouchableOpacity>
        )}
        <View style={tw`flex-1 justify-center items-center`}>
          <TouchableOpacity style={tw`bg-blue-500 rounded-full p-6`}>
            <Text style={tw`text-white text-lg font-bold`}>Clock In</Text>
          </TouchableOpacity>
          <Text style={tw`text-white text-lg font-bold`}>Clock In</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;