import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import Contacts from 'react-native-contacts';

const dateFormat = require('dateformat');

function deleteAllNotification() {
  PushNotification.cancelAllLocalNotifications();
}

function pushNotificationLocal(contact) {
  PushNotification.localNotification({
    channelId: '552h4f5d',
    vibration: 100,
    message: `Don't forget to congragulate this contact.`,
  });
}

function pushNotificationSchedule(contacts) {
  const today = new Date(Date.now());
  contacts &&
    contacts.forEach((contact) => {
      const dateOfNotification = new Date(contact.birthday);
      dateOfNotification.setHours(9, 0, 0, 0);

      if (
        dateFormat(today, 'dd.mm') ===
          dateFormat(dateOfNotification, 'dd.mm') &&
        today.getHours() >= 9
      )
        return;

      PushNotification.localNotificationSchedule({
        channelId: '552h4f5d',
        vibration: 100,
        message: `Today ${
          (contact.age + 1) % 10 === 0 ? 'anniversary' : 'birthday'
        } in ${contact.displayName}`,
        date: dateOfNotification,
        userInfo: contact,
      });
    });
}

export default () => {
  PushNotification.channelExists('552h4f5d', (res) => {
    if (!res)
      PushNotification.createChannel(
        {
          channelId: '552h4f5d',
          channelName: 'birthday',
        },
        (res) => {
          res ? configuration() : console.log("Channel can't be created.");
        },
      );
    else configuration();
  });

  const configuration = () =>
    PushNotification.configure({
      onRegister: function (token) {
        console.log('Token: ' + token);
      },

      onNotification: function (notification) {
        console.log('Notification: ', notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('Action:', notification.action);
        console.log('Notification:', notification);
      },

      onRegistrationError: function (error) {
        console.log('Error:', error);
      },

      requestPermissions: Platform.OS === 'ios',
    });
};

async function sendNotificationByPhoneNumber(phoneNumber) {
  const contactWithoutBurthday = await Contacts.getContactsByPhoneNumber(
    phoneNumber,
  );
  const contact = await Contacts.getContactById(
    contactWithoutBurthday[0].recordID,
  );

  if (!contact?.birthday) return;

  const today = new Date();

  const birthday = new Date(
    contact.birthday.year,
    contact.birthday.month - 1,
    contact.birthday.day,
  );

  if (dateFormat(today, 'ddmm') === dateFormat(birthday, 'ddmm'))
    pushNotificationLocal(contact);
}

export {
  pushNotificationSchedule as pushNotification,
  sendNotificationByPhoneNumber,
  deleteAllNotification,
};
