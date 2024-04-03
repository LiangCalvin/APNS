import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const Splash = ({navigation}) => {
  const onPressQuestion = () => {
    navigation.navigate('Question');
  };
  const onPressLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={onPressQuestion} style={{marginBottom: 20}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../img/01.jpeg')}
            style={{width: 250, height: 250}}
          />
          <Text>Go to Question</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressLeaderboard}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../img/03.jpeg')}
            style={{width: 250, height: 250}}
          />
          <Text>Go to Leaderboard</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Splash;
