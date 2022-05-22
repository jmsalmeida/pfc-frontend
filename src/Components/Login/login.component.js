import React from 'react';
import { SafeAreaView,Text, ImageBackground } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Input, Avatar } from '@ui-kitten/components';

export const LoginScreen = ({ navigation }) => {

  const navigateRegister = () => {
    navigation.navigate('RegisterPartyer');
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
   
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar source={require('../../assets/adaptive-icon.png')} ImageComponent={ImageBackground}/>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
          label={evaProps => <Text {...evaProps}>Email</Text>}
        />
        <Input
          placeholder='Senha'
          value={password}
          onChangeText={nextValue => setPassword(nextValue)}
          label={evaProps => <Text {...evaProps}>Senha</Text>}
          secureTextEntry={true}
        />
        <Button onPress={navigateRegister} disabled={true}>
          Acessar
        </Button>
        <Button onPress={navigateRegister}>Cadastrar novo usuario</Button>
      </Layout>
    </SafeAreaView>
    
  );
};