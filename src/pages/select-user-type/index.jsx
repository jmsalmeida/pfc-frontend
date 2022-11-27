import {
  Card,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Image } from 'react-native';
import { styles } from './styles';

export function SelectUserTypeScreen({ navigation }) {
  const navigateRegister = () => {
    navigation.navigate('RegisterPartyer');
  };

  const navigateRegisterPlace = () => {
    navigation.navigate('RegisterPartyPlace');
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName, style = {}) => <Icon style={style} name={iconName} />;

  function BackAction() {
    return <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack} />;
  }

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        title="Selecione seu tipo de conta"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />

      <Layout style={styles.container}>
        <Card style={styles.buttonCard} onPress={navigateRegister}>
          <Layout style={styles.descriptionRegister}>
            <Image style={{ width: 150, height: 150 }} source={require('../../assets/icon.png')} />
            <Text category="h5">Cliente</Text>
            <Text category="p2">Quero buscar estabelecimentos</Text>
          </Layout>
        </Card>

        <Card style={styles.buttonCard} onPress={navigateRegisterPlace}>
          <Layout style={styles.descriptionRegister}>
            <Image style={{ width: 150, height: 150 }} source={require('../../assets/icon.png')} />
            <Text category="h5">Estabelecimento</Text>
            <Text category="p2">Quero cadastrar meu estabelecimento</Text>
          </Layout>
        </Card>
      </Layout>
    </Layout>
  );
}
