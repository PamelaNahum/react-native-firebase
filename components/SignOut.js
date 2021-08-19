import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import firebase from 'firebase';

export default () => {

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      const user = firebase.auth().currentUser;
      if (user === null) {
        console.log('xd')
        navigate('login')
      }
    })

  }

  return (
    <Icon
      style={styles.button}
      name='logout'
      onPress={signOut} />
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    color: 'black',
  },
  icon: {
    width: 37.7 * 0.8,
    height: 40.9 * 0.8,
  },
});
