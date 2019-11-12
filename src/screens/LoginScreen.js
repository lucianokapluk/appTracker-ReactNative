import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import db from '../config';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
    };
  }
  static cardStyle = {
    backgroundColor: '#212121',
  };
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '720146341436-84upn5dj20uf7ol2h3855hm942enkis4.apps.googleusercontent.com',
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo, loggedIn: true});

      this.props.dispatch({
        type: 'LOGEARSE',
        payload: {
          state: {userInfo: userInfo, loggedIn: true},
        },
      });

      this.props.navigation.navigate('Loading');
    } catch (error) {
      this.setState({loggedIn: false});

      console.log(error.code, '1');

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code, '2');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code, '3');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error.code, '4');
      } else {
        // some other error happened
      }
    }
  };

  /*   getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
      this.props.dispatch({
        type: 'LOGEARSE',
        payload: {
          state: {userInfo: userInfo, loggedIn: true},
        },
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({loggedIn: false});
      } else {
        // some other error
        this.setState({loggedIn: false});
      }
    }
  }; */

  render() {
    return (
      <Fragment>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AppTracking</Text>
        </View>

        <View style={styles.iconContainer}>
          <Image
            style={{width: 150, height: 150}}
            source={require('../../assets/ubi.png')}
          />
        </View>

        <View style={styles.parrafo}>
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          />
        </View>
        <View style={styles.parrafo}>
          <Text style={{color: 'white'}}>
            Por favor inicia sesion para poder comenzar a trackear!
          </Text>
        </View>
        <View style={styles.parrafo}>
          <TouchableOpacity
            style={styles.register}
            onPress={() =>
              Linking.openURL('https://my-gps-94a6c.firebaseapp.com/')
            }>
            <Text style={{color: 'black'}}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
  },
  iconContainer: {
    height: 170,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  parrafo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  register: {
    backgroundColor: '#98B5DB',
    borderRadius: 20,
    padding: 10,
    marginTop: 100,
  },
});
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(LoginScreen);
