import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Button, Divider, Layout, Input, Avatar} from '@ui-kitten/components';
import { disableButton } from '../../util/utils.js';

export const LoginScreen = ({ navigation }) => {

  const navigateRegister = () => {
    navigation.navigate('RegisterPartyer');
  };

  const printLogin = (email, password) => {
    console.log(email, password);
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
   
    <Layout style={{ flex: 1}}>
      <Divider/>
      <Avatar
      source={require('../../assets/adaptive-icon.png')} ImageComponent={ImageBackground}/>
      <Layout style={styles.container}>
        <Input style={styles.inputContainer}
          placeholder='Email'
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
          //label={evaProps => <Text {...evaProps}>Email</Text>}
        />
        <Input style={styles.inputContainer}
          placeholder='Senha'
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
          //label={evaProps => <Text {...evaProps}>Senha</Text>}
          secureTextEntry={true}
        />
        <Layout>
          <Button style={styles.submitButton} 
            disabled={disableButton([
              email, password
            ])}
            onPress={printLogin(email, password)}>Acessar</Button>
            
          <Button style={styles.registerButton}
          onPress={navigateRegister}>Criar nova conta</Button>
        </Layout>
      </Layout>
    </Layout>

    //espaçamento entre os inputs
    //espaçamento entre os botões
    //botão tem que ocupar o mesmo espaço que os inputs
    //imprimir no console o email e password quando clicar em acessar(dentro da função onPress)
    //esqueceu a senha
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    
  },

  inputContainer: { paddingVertical: 6 },

  submitButton: { 
    paddingVertical: 6,
    marginTop: 10
  },

  registerButton: {
    paddingVertical: 6,
    marginTop: 10
  }
});