import React from 'react';
import Toast from 'react-native-toast-message';

import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { ENV } from '../../config/envinroments';
import { disableButton } from '../../util/utils.js';
import { styles } from './styles';

import { setUserSession } from '../../reducers/application.js';

export function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const navigateRegister = () => {
    navigation.navigate('SelectUserType');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authenticateUser = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const headers = new Headers();
    const base64 = require('base-64');
    const credentials = base64.encode(`${email}:${password}`);
    headers.set('Authorization', `Basic ${credentials}`);

    try {
      const response = await fetch(`${ENV.BASE_URL}/api-keys`, {
        method: 'POST',
        headers,
      });
      if (!response.ok) throw response;

      Toast.show({
        type: 'success',
        visibilityTime: 1000,
        text1: 'Bem vindo ao Cola Aqui!',
      });

      const json = await response.json();
      if (!json.token) throw response;
      dispatch(setUserSession(json));
    } catch (error) {
      if (error && error.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Usuário e/ou senha inválidos',
          onHide: () => setPassword(''),
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Layout style={styles.logoContainer}>
          <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
        </Layout>

        <Input
          style={styles.inputContainer}
          value={email}
          label="Email"
          placeholder="Digite o email cadastrado"
          onChangeText={(nextValue) => setEmail(nextValue)}
        />

        <Input
          style={styles.inputContainer}
          label="Senha"
          placeholder="Digite a senha cadastrada"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
          secureTextEntry
        />

        <Layout>
          <Button
            style={styles.actionButton}
            disabled={disableButton([email, password])}
            onPress={authenticateUser}
          >
            Acessar
          </Button>

          <Text style={styles.registerLabel}>
            Ainda não é cadastrado?{' '}
            <Text style={styles.registerLink} category="s1" onPress={navigateRegister}>
              Criar nova conta
            </Text>
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
}
