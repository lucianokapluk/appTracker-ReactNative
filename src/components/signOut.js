import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {GoogleSignin} from 'react-native-google-signin';
import {withNavigation} from 'react-navigation';
class SignOut extends Component {
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
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.signOut()} title={'oit'}>
          <Text style={{color: '#31AEB0', paddingRight: 10, fontSize: 15}}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(withNavigation(SignOut));
