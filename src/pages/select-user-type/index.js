import React from 'react'
import {
  Divider,
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Card,
  Text,
} from '@ui-kitten/components'
import { styles } from './styles'

export const SelectUserTypeScreen = ({ navigation }) => {
  const navigateRegister = () => {
    navigation.navigate('RegisterPartyer')
  }

  const navigateRegisterPlace = () => {
    navigation.navigate('RegisterPartyPlace')
  }

  const navigateBack = () => {
    navigation.goBack()
  }

  const generateIcon = (iconName, style = {}) => (
    <Icon style={style} name={iconName} />
  )

  const BackAction = () => (
    <TopNavigationAction
      icon={generateIcon('arrow-back')}
      onPress={navigateBack}
    />
  )

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
            <Text category="h5">Cliente</Text>
            <Text category="p2">Quero buscar estabelecimentos</Text>
          </Layout>
        </Card>

        <Card style={styles.buttonCard} onPress={navigateRegisterPlace}>
          <Layout style={styles.descriptionRegister}>
            <Text category="h5">Estabelecimento</Text>
            <Text category="p2">Quero cadastrar meu estabelecimento</Text>
          </Layout>
        </Card>
      </Layout>
    </Layout>
  )
}
