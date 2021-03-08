import React from 'react';
import HomeScreen from './scenes/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {List, Colors} from 'react-native-paper';
import InfoScreen from './scenes/InfoScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function Routes(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () =>
            route.name === 'Home' && (
              <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                <List.Icon icon="information-outline" color={Colors.black} />
              </TouchableOpacity>
            ),
        })}>
        <Stack.Screen
          name="Home"
          options={{
            title: 'BirthDate',
          }}>
          {() => <HomeScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Info"
          options={{
            title: 'Info',
          }}>
          {() => <InfoScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
