import {
  Icon,
  Text,
  Input,
  Layout,
  Button,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useState } from 'react';
import { styles } from './styles';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import { disableButton } from '../../util/utils';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserSession } from '../../reducers/application';
import { ResendConfirmationCode } from './resend-confirmation-code';

export function ConfirmUserEmailScreen({ navigation }) {
  const dispatch = useDispatch();
  const [confirmToken, setConfirmToken] = useState('');

  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName, style = {}) => <Icon style={style} name={iconName} />;

  function BackAction() {
    return <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack} />;
  }

  const sendUserConfirmToken = async () => {
    try {
      const response = await api.post('/auth/email-confirmation', {
        body: JSON.stringify({ confirmToken }),
      });

      if (!response.ok) throw response;

      const { Authorization } = response.body;

      await api.jwt(Authorization);
      dispatch(setUserSession(Authorization));

      Toast.show({
        type: 'success',
        text1: 'Bem vindo ao cola aqui!',
        text2: 'Obrigado por confirmar o seu cadastro',
      });
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado com a confirmação!',
        text2: `${errorMessage}`,
      });
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title="Confirmação de email" alignment="center" accessoryLeft={BackAction} />
      <Divider />

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text category="h4">Estamos quase lá!</Text>

          <Text style={styles.textContainer.auxText} category="s1">
            Para concluir o seu cadastro, verifique a caixa de entrada do e-mail cadastrado para
            obter o código de confirmação
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            required
            label="Código de confirmação"
            style={styles.inputContainer}
            placeholder="Insira o código de confirmação"
            value={confirmToken}
            onChangeText={(nextValue) => setConfirmToken(nextValue)}
          />

          <Button disabled={disableButton([confirmToken])} onPress={sendUserConfirmToken}>
            confirmar cadastro
          </Button>

          <ResendConfirmationCode />
        </View>
      </View>
    </Layout>
  );
}
