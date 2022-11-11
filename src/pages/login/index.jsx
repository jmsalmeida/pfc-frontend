import React from 'react';
import Toast from 'react-native-toast-message';

import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { disableButton } from '../../util/utils.js';
import { styles } from './styles';

import { setCurrentUser, setUserSession } from '../../reducers/application.js';
import { api } from '../../services/api';

export function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const navigateRegister = () => {
    navigation.navigate('SelectUserType');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authenticateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/auth/signin', {
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw response;

      const { user } = response.body;
      dispatch(setCurrentUser(user));

      if (user.email_confirmed) {
        const { Authorization } = response.body;

        await api.jwt(Authorization);
        dispatch(setUserSession(Authorization));

        Toast.show({
          type: 'success',
          text1: 'Bem vindo ao Cola Aqui!',
        });
      } else {
        Toast.show({
          type: 'info',
          text1: 'Usuário não confirmado!',
          text2: 'Você será redirecionado para a confirmação',
          onHide: () => navigation.navigate('ConfirmUserEmail'),
        });
      }
    } catch (error) {
      const errorMessage = error.body.errors[0];

      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
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
