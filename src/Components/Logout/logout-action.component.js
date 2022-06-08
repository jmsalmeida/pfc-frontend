import React from 'react';
import Toast from 'react-native-toast-message';

import { Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserSession } from '../../reducers/application.js';

export const LogoutAction = () => {
  const dispatch = useDispatch();
  const userSession = useSelector(state => state.userSession.value)

  const logoutAction = async () => {
    try {
      const headers = new Headers({
        'Authorization': `Token ${userSession.token}`,
        'Content-Type': 'application/json'
      });

      const response = await fetch(`http://localhost:3000/api-keys/${userSession.id}`, { method: 'DELETE', headers });
      if (!response.ok) throw response;

      dispatch(clearUserSession());

      Toast.show({
        type: 'info',
        text1: 'Você fez logout!',
        text2: 'Obrigado por usar o nosso app.'
      });
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Button
    size='medium'
    appearance='ghost'
    onPress={logoutAction}>
      Sair
    </Button>
  )
}