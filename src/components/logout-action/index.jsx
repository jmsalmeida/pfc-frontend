import React from 'react';
import Toast from 'react-native-toast-message';

import { Button } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { ENV } from '../../config/envinroments';
import { clearUserSession } from '../../reducers/application';

export function LogoutAction() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.userSession.value);

  const logoutAction = async () => {
    try {
      // eslint-disable-next-line no-undef
      const headers = new Headers({
        Authorization: `Token ${userSession.token}`,
        'Content-Type': 'application/json',
      });

      const response = await fetch(`${ENV.BASE_URL}/api-keys/${userSession.id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw response;

      dispatch(clearUserSession());

      Toast.show({
        type: 'info',
        text1: 'Você fez logout!',
        text2: 'Obrigado por usar o nosso app.',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Button size="medium" appearance="ghost" onPress={logoutAction}>
      Sair
    </Button>
  );
}
