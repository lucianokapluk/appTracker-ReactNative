import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image,} from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
   
    }
  }
  componentDidMount() {
    GoogleSignin.configure({
  
      webClientId: '720146341436-84upn5dj20uf7ol2h3855hm942enkis4.apps.googleusercontent.com',
     
      
      
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      console.log(this.state)
    } catch (error) {
        console.log(error.code, '1')
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code, '2')
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code, '3')
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error.code, '4')
      } else {
        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>

        
           <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                  disabled={this.state.isSigninInProgress} />
          
       {    }
     
      </Fragment>
    );
  }
}

