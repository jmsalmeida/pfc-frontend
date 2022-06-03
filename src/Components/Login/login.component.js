import React from 'react';
import Toast from 'react-native-toast-message';

import { StyleSheet, Image } from 'react-native';
import { Button, Layout, Input, Text } from '@ui-kitten/components';
import { disableButton } from '../../util/utils.js';

export const LoginScreen = ({ navigation }) => {
  const navigateRegister = () => {
    navigation.navigate('SelectUserType');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const authenticateUser = (event) => {
    event.preventDefault();

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${email}:${password}`));
    fetch('http://localhost:3000/api-keys', { method: 'POST', headers })
    .then(response => {
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Bem vindo ao Cola Aqui!',
          onShow: () => navigation.navigate('SearchParty')
        });
      } else {
        throw response
      }
    }).catch((error) => {
      if (error && error.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Usuário e/ou senha inválidos',
          onHide: () => setPassword('')
        });
      }
    });
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Layout style={styles.logoContainer}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/logo.png')}
          />
        </Layout>

        <Input style={styles.inputContainer}
          value={email}
          label='Email'
          placeholder='Digite o email cadastrado'
          onChangeText={nextValue => setEmail(nextValue)}
        />

        <Input style={styles.inputContainer}
          label='Senha'
          placeholder='Digite a senha cadastrada'
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
          secureTextEntry={true}
        />

        <Layout>
          <Button style={styles.actionButton}
            disabled={disableButton([email, password])}
            onPress={authenticateUser}>
            Acessar
          </Button>

          <Text style={styles.registerLabel}>Ainda não é cadastrado? <Text style={styles.registerLink} category='s1' onPress={navigateRegister}>Criar nova conta</Text></Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },

  actionButton: { marginTop: 20 },
  inputContainer: { paddingVertical: 5 },
  registerLabel: { textAlign: 'center', paddingTop: 50 },
  registerLink: {
    color: '#3366FF',
    textDecorationLine: 'underline',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 10
  },

  logoImage: {
    width: 200,
    height: 200,
  }
});