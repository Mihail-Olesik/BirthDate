import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts"

function getContacts(isBirthday) {
  Contacts.checkPermission().then((permission) => {
    if (permission === "undefined" || permission === "denied") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ).then((permission) => {
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll().then((contacts) =>
            this.setState({ contacts: filterContacts(contacts, isBirthday) })
          );
        } else this.setState({ contacts: null });
      });
    } else if (permission === "authorized") {
      Contacts.getAll().then((contacts) =>
        this.setState({ contacts: filterContacts(contacts, isBirthday) })
      );
    } else this.setState({ contacts: null });
  });
}

function filterContacts(contacts, isBirthday) {
  if (contacts !== null) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newContacts = contacts.filter((item) =>
      isBirthday ? item.birthday !== undefined : item.birthday === undefined
    );
    if (isBirthday) {
      newContacts.forEach((item) => {
        const birthday = new Date(
          item.birthday.year,
          item.birthday.month - 1,
          item.birthday.day
        );

        item.birthday = new Date(birthday);
        item.birthday.setFullYear(today.getFullYear());
        item.birthday.setHours(0, 0, 0, 0);

        item.age =
          today.getFullYear() -
          birthday.getFullYear() -
          (item.birthday < today ? 0 : 1);
      });

      newContacts.sort((a, b) => {
        return a.birthday > b.birthday;
      });

      const bellowContacts = newContacts.filter((item) => {
        return item.birthday < today;
      });

      const afterContacts = newContacts.filter((item) => {
        return item.birthday >= today;
      });

      bellowContacts.forEach((item) =>
        item.birthday.setFullYear(item.birthday.getFullYear() + 1)
      );

      return afterContacts.concat(bellowContacts);
    } else {
      return newContacts.sort((a, b) => a.displayName > b.displayName);
    }
  }
  return null;
}

async function updateContact(contact) {
  let permission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
  );

  if (permission === false) {
    permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
    );

    if (permission === true) {
      await Contacts.updateContact(contact);
    } else {
      alert("Access denied!");
    }
  } else if (permission === true) {
    await Contacts.updateContact(contact);
  } else {
    alert("Access denied!");
  }
}

export { getContacts, updateContact };
