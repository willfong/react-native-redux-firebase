import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  SAVE_TOKEN,
  SAVE_NAME,
  FACEBOOK_LOGOUT_SUCCESS
} from './types';
import { CONFIG_FACEBOOK_APP_ID } from '../config_variables';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

export const saveToken = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: SAVE_TOKEN, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
}

export const saveName = (name) => {
  return {
    type: SAVE_NAME,
    payload: name
  }
}

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(CONFIG_FACEBOOK_APP_ID, {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export const facebookLogout = () => async dispatch => {
  await AsyncStorage.removeItem('fb_token');
  dispatch({ type: FACEBOOK_LOGOUT_SUCCESS });
}
