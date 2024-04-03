import React from 'react';
// import {View} from 'react-native';
import Splash from './components/Splash';
import Question from './components/Question';
// import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Leaderboard from './components/Leaderboard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{title: 'Welcome to exam'}}
        />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
