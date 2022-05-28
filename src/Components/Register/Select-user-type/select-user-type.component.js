import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Divider, Layout, Avatar, Icon, TopNavigation ,TopNavigationAction, Card, Text} from '@ui-kitten/components';

export const SelectUserTypeScreen = ({ navigation }) => {
	const navigateRegister = () => {
		navigation.navigate('RegisterPartyer');
	};

	const navigateRegisterPlace = () => {
		navigation.navigate('RegisterPartyPlace');
	};

	const navigateBack = () => {
		navigation.goBack();
	};

	const generateIcon = (iconName, style={}) => (
		<Icon style={style} name={iconName} />
	)

	const BackAction = () => (
		<TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack}/>
	);

  return (
	<Layout style={{ flex: 1}}>
	  <Divider/>
	  <TopNavigation title='Selecione seu tipo de conta' alignment='center' accessoryLeft={BackAction} />
	  <Avatar
	  source={require('../../../assets/adaptive-icon.png')} ImageComponent={ImageBackground}/>
	  <Layout style={styles.container}> 
			<Card style={styles.buttonCard} onPress={navigateRegister}>
        <Layout style={styles.userCard}>
          <Layout style={{flex: 7, flexDirection: 'row'}}>
            {generateIcon('person-outline', styles.iconRegister)}
            <Layout style={styles.descriptionRegister}>
              <Text category={'h5'}>Cliente</Text>
              <Text category={'p2'}>Quero buscar estabelecimentos</Text>  
            </Layout>        
          </Layout>
          <Layout style={{flex: 1, alignItems: 'flex-end'}}>
          {generateIcon('arrow-forward', styles.arrowForward)}
          </Layout>
        </Layout>
			</Card>
      <Card style={styles.buttonCard} onPress={navigateRegisterPlace}>
        <Layout style={styles.userCard}>
          <Layout style={{flex: 7, flexDirection: 'row'}}>
            {generateIcon('briefcase-outline', styles.iconRegister)}
            <Layout style={styles.descriptionRegister}>
              <Text category={'h5'}>Estabelecimento</Text>
              <Text category={'p2'}>Quero cadastrar meu estabelecimento</Text>  
            </Layout>        
          </Layout>
          <Layout style={{flex: 1, alignItems: 'flex-end'}}>
            {generateIcon('arrow-forward', styles.arrowForward)}
          </Layout>
        </Layout>
			</Card>
		</Layout>
	</Layout>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: 'center',
	},

  buttonCard: {
    paddingVertical: 6,
    marginTop: 10
  },

  userCard: {
    flex: 1, 
    flexDirection: 'row'
  },

  iconRegister: {
		width: 43,
    height: 43,
	},

  descriptionRegister: {
		paddingLeft: 5
	},

  arrowForward: {
		width: 23,
    height: 23,
	},
});