import React, {Component} from 'react';
import db from '../config';
import Firebase from 'firebase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';

import Geolocation from 'react-native-geolocation-service';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ubicacion: '',
      on: false,
      timer: null,
      counter: 0,
      uid: '',
    };
  }

  tick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
    console.log(this.state.counter);
    if (this.state.counter == 5 && this.state.on == true) {
      this.geoloca();
      this.setState({
        counter: 0,
      });
    }
  };

  start = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  };

  off = () => {
    this.setState({on: false});
    clearInterval(this.state.timer);
  };
  on = () => {
    this.setState({on: true});
    this.start();
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.dispatch({
        type: 'LOGEARSE',
        payload: {
          state: {userInfo: null, loggedIn: false},
        },
      });
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  geoloca = async () => {
    console.log('tap');
    if (this.requestLocationPermission()) {
      await Geolocation.getCurrentPosition(
        position => {
          db.collection('points')
            .add({
              point: new firebase.firestore.GeoPoint(
                position.coords.latitude,
                position.coords.longitude,
              ),
              userId: this.state.uid,
              timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(function(docRef) {
              console.log('Document written with ID: ', docRef.id);
            })
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
          console.log(position.coords.latitude, position.coords.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };
  componentDidMount() {
    db.collection('users')
      .get({})
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.props.Reducers.state.userInfo.user.email == doc.data().email
          ) {
            this.setState({uid: doc.id});
          }
        });
      });
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    return (
      <View>
        <Text>It Trolls</Text>
        <View>
          <Button title={'ON'} onPress={() => this.on()}>
            {' '}
          </Button>
          <Button title={'OFF'} onPress={() => this.off()}>
            {' '}
          </Button>
          <Button onPress={() => this.signOut()} title={'oit'} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(HomeScreen);
