import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import db from '../config';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
const ancho = Dimensions.get('window').width;
const alto = Dimensions.get('window').height;
import firebase from 'firebase';
class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExist: false,
      uid: '',
    };
  }

  static cardStyle = {
    backgroundColor: '#212121',
  };

  componentDidMount() {
    this.getUsers();
    /*  if (this.props.Reducers.state.loggedIn === true) {
      console.log('yes');
      this.props.navigation.navigate('App');
      console.log(this.props.Reducers.state.userInfo.user, 'PROERTEIS');
    } else {
      this.props.navigation.navigate('Login');
    } */
  }
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

  getUsers = () => {
    db.collection('users')
      .get({})
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.props.Reducers.state.userInfo.user.email == doc.data().email
          ) {
            console.log(doc, 'DOOOOOOOC');
            this.setState({isExist: true});
          } else {
            console.log('el usuario no existe');
          }
        });

        if (this.state.isExist) {
          this.props.navigation.navigate('App');
        } else {
          //this.addUser(this.state);
          alert(
            'Este usuario no esta registrado, visite https://my-gps-94a6c.firebaseapp.com/ para registrarse',
          );
          this.signOut();
          this.props.navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  /*   addUser = data => {
    db.collection('users')
      .add({
        color: 'red',
        email: data.users.user.email,
        spotId: '',
        username: data.users.user.name,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
 */
  render() {
    console.disableYellowBox = true;
    return (
      <View style={{backgroundColor: '#212121', width: ancho, height: alto}}>
        <View style={{marginVertical: 200}}>
          <View style={styles.logoLogin}>
            <Text style={styles.fontLogin}>AppTracking</Text>
          </View>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#f44336" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  logoLogin: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginBottom: 10,
  },
  fontLogin: {
    fontFamily: 'Channel',
    fontSize: 40,
    color: 'white',
  },
});

//mapstate(reducers) y actions
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(LoadingScreen);
