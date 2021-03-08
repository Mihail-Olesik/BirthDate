import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.nameOfApp}>BirthDate</Text>
        <Text style={styles.version}>Version: 1.0</Text>
        <Icon size={144} name="cake" color={Colors.red500} />
        <Text style={styles.version}>©2021 HobzGuardZ Inc.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameOfApp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  version: {
    paddingBottom: 10,
  },
});
