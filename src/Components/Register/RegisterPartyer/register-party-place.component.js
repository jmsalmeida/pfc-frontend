import React from 'react';
import { ImageBackground } from 'react-native';
import { Divider, Layout, Text, Avatar, Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

export const RegisterPartyPlaceScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName) => (
    <Icon name={iconName} />
  );

  const BackAction = () => (
    <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack}/>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title='Cadastro de estabelecimento' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
      <Avatar source={require('../../../assets/adaptive-icon.png')} ImageComponent={ImageBackground}/>
      <Text>CADASTRO DE ESTABELECIMENTO</Text>
    </Layout>
  );
};