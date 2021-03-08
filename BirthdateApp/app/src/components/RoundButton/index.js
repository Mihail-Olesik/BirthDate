import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, FAB} from 'react-native-paper';

export default function RoundButton(props) {
  return <FAB style={styles.fab} icon="calendar" onPress={props.onClick} />;
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.red500,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
