import React from 'react';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { Avatar, Layout, Text } from '@ui-kitten/components';

export function UserProfileHeader() {
  const currentUser = useSelector((state) => state.userSession.currentUser);

  return (
    <Layout style={styles.container}>
      <Avatar style={styles.avatar} size="medium" source={require('../../assets/logo.png')} />

      <Layout>
        {/* <Text category="h6">{{currentUser.partyer.name}}</Text> */}
        <Text category="h6">James Almeida</Text>
        <Text category="s2">Bem vindo!</Text>
      </Layout>
    </Layout>
  );
}
