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
const ancho = Dimensions.get('window').width;
const alto = Dimensions.get('window').height;
class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
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
  getUsers = () => {
    console.log(this.props.Reducers.state.userInfo);
    db.collection('users')
      .get({})
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (
            this.props.Reducers.state.userInfo.user.email == doc.data().email
          ) {
            this.setState({isExist: true});
          } else {
            console.log('el usuario no existe');
          }
        });

        if (this.state.isExist) {
          this.props.navigation.navigate('App');
          console.log('YA EXISTE');
          console.log(this.state.users, 'DATA');
        } else {
          this.setState({users: this.props.Reducers.state.userInfo});
          this.addUser(this.state);
          this.props.navigation.navigate('App');
        }
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  addUser = data => {
    console.log(data.users.user, 'DATA');
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

  render() {
    console.log(this.props, 'NAZI');
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
