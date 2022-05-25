import React from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';

export const SearchPartyScreen = ({ navigation }) => {
  const logoutUser = (event) => {
    event.preventDefault();
    navigation.navigate('Login')
  }

  return (
    <Layout>
      <Text>Buscar Bares</Text>

      <Button onPress={logoutUser}>
        Sair
      </Button>
    </Layout>
  )
}