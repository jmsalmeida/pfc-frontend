import Toast from 'react-native-toast-message';

import { Button } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { clearCurrentUser, clearUserSession } from '../../reducers/application';
import { api } from '../../services/api';

export function LogoutAction() {
  const dispatch = useDispatch();

  const logoutAction = async () => {
    try {
      const response = await api.del('/auth/signout');
      if (!response.ok) throw response;

      dispatch(clearUserSession());
      dispatch(clearCurrentUser());

      Toast.show({
        type: 'info',
        text1: 'Você fez logout!',
        text2: 'Obrigado por usar o nosso app.',
      });
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    }
  };

  return (
    <Button size="small" status="danger" onPress={logoutAction}>
      Sair
    </Button>
  );
}
