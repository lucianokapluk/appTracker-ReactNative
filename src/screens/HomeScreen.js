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
  Image,
  Button,
  TouchableOpacity,
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
      coords: '',
      user: '',
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
          this.setState({
            coords:
              '[ ' +
              position.coords.latitude +
              ' ºS, ' +
              position.coords.longitude +
              ' ºW]',
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
    this.setState({user: this.props.Reducers.state.userInfo.user});
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
    console.log(this.props, 'ACCACASCAASACS');
    //this.props.Reducers.state.userInfo.user;
    return (
      <View>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: this.state.user.photo,
            }}
          />
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.email}> {this.state.user.name}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.startCont}>
            <TouchableOpacity onPress={() => this.on()}>
              <Text style={styles.start}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity title={'OFF'} onPress={() => this.off()}>
              <Text style={styles.start}>End</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.counter}>{this.state.counter}</Text>
          <Text style={styles.coords}>{this.state.coords}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emailContainer: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  email: {
    color: 'white',
    fontSize: 18,
  },
  buttonsContainer: {
    marginTop: 20,
    height: 400,
  },
  startCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  start: {
    backgroundColor: 'red',
    fontSize: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  counter: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    marginTop: -50,
  },
  coords: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 50,
    fontSize: 18,
  },
});
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(HomeScreen);
