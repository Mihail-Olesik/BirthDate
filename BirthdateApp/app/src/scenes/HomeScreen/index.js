import React from 'react';
import {
  ActivityIndicator,
  AppState,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getContacts} from '../../utils/ContactUtils';
import {List, Colors} from 'react-native-paper';
import RoundButton from '../../components/RoundButton';
import Dialog from 'react-native-dialog';
import {
  pushNotification,
  deleteAllNotification,
} from '../../utils/NotificationCenter';

import ListItem from '../../components/ListItem';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getContacts = getContacts.bind(this, true);

    this.state = {
      loading: true,
      contacts: null,
      appState: AppState.currentState,
      currentContact: null,
      visible: false,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.getContacts();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    )
      this.getContacts();
    this.setState({appState: nextAppState});

    if (this.state.contacts) {
      deleteAllNotification();
      pushNotification(this.state.contacts);
    }
  };

  render() {
    return (
      <>
        {this.state.contacts === null ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <ScrollView>
            {this.state.contacts.map((item, index) => {
              return (
                <ListItem
                  key={item.rawContactId}
                  contact={item}
                  name={item.displayName}
                  birthdate={item.birthday}
                  age={item.age + 1}
                  onPress={() => {
                    this.setState({currentContact: item, visible: true});
                  }}
                />
              );
            })}
          </ScrollView>
        )}

        <RoundButton
          onClick={() =>
            Linking.openURL('content://com.android.calendar/time/')
          }
        />

        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Choose the phone number:</Dialog.Title>
          {this.state.currentContact &&
            this.state.currentContact.phoneNumbers.map((item) => (
              <List.Item
                key={item.id}
                title={item.number}
                titleStyle={{color: 'black'}}
                rippleColor={'#ccc'}
                onPress={() => {
                  Linking.openURL(`tel:${item.number}`);
                }}
                right={() => <List.Icon icon="phone" color={Colors.grey500} />}
              />
            ))}
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({visible: false})}
          />
        </Dialog.Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
