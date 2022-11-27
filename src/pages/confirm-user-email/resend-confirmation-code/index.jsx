import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { api } from '../../../services/api';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

export function ResendConfirmationCode() {
  const currentUser = useSelector((state) => state.userSession.currentUser);
  const resendConfirmationCode = async () => {
    try {
      const response = await api.post('/auth/resend-email-confirmation', {
        body: JSON.stringify({ user_id: currentUser?.id }),
      });

      if (!response.ok) throw response;

      Toast.show({
        type: 'info',
        text1: 'Código re-enviado',
        text2: `Verifique o email ${currentUser?.email}`,
      });
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado ao re-enviar o código',
        text2: `${errorMessage}`,
      });
    }
  };

  return (
    <View style={{ alignItems: 'center', paddingVertical: 40 }}>
      <Text category="s2" style={{ textAlign: 'center', lineHeight: 22 }}>
        Não recebeu o código? Verifique sua caixa de lixo eletrônico ou{' '}
        <Text
          category="s2"
          style={{ color: '#E09C0F', fontWeight: '700', textDecorationLine: 'underline' }}
          onPress={() => resendConfirmationCode()}
        >
          clique para receber novamente.
        </Text>
      </Text>
    </View>
  );
}
