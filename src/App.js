import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import tw from 'twrnc';
import MainNavigator from './navigations/MainNavigator';
import {createTables} from './database';

const App = () => {
  createTables();
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={tw`flex-1 bg-red-600`}> */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <MainNavigator />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;
