import React from 'react';
import Routes from './app/src/Routes';
import {Provider as PaperProvider} from 'react-native-paper';
import NotifCenter from './app/src/utils/NotificationCenter';
import CallDetectorManager from 'react-native-call-detection';
import {sendNotificationByPhoneNumber} from './app/src/utils/NotificationCenter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    NotifCenter();
  }

  componentDidMount() {
    this.startListerner();
  }

  componentWillUnmount() {
    //this.stopListerner();
  }

  startListerner() {
    this.callDetector = new CallDetectorManager((event, phoneNumber) => {
      if (event === 'Incoming') sendNotificationByPhoneNumber(phoneNumber);
    }, true);
  }

  stopListerner = () => {
    this.callDetector && this.callDetector.dispose();
  };

  render() {
    return (
      <PaperProvider>
        <Routes />
      </PaperProvider>
    );
  }
}
