import React from 'react';
import {Linking, StyleSheet, Text} from 'react-native';
import {List, Colors} from 'react-native-paper';

const dateFormat = require('dateformat');

export default function ListItem(props) {
  return (
    <List.Item
      title={props.name}
      description={
        props.birthdate && dateFormat(props.birthdate, 'dd mmmm yyyy')
      }
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      style={styles.description}
      left={
        props.birthdate &&
        (() => (
          <List.Icon
            icon="cake"
            color={
              dateFormat(props.birthdate, 'ddmm') ===
              dateFormat(new Date(), 'ddmm')
                ? Colors.red600
                : Colors.grey500
            }
          />
        ))
      }
      right={props.birthdate && (() => <Text>{props.age} years</Text>)}
      onPress={props.onPress}
      onLongPress={() => {
        Linking.openURL(
          `content://com.android.calendar/time/${props.birthdate.getTime()}`,
        );
      }}
      rippleColor={'#ccc'}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },
  description: {
    color: 'grey',
  },
});
