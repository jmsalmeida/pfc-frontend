import React from 'react'
import { StyleSheet, Linking, View, ScrollView } from 'react-native'
import {
  Divider,
  Layout,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
  Input,
  Radio,
  Button,
} from '@ui-kitten/components'
import { disableButton } from '../../util/utils'
import { api } from '../../services/api'
import Toast from 'react-native-toast-message'
import { cnpj } from 'cpf-cnpj-validator'

export const RegisterPartyPlaceScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack()
  }

  const generateIcon = (iconName) => <Icon name={iconName} />

  const BackAction = () => (
    <TopNavigationAction
      icon={generateIcon('arrow-back')}
      onPress={navigateBack}
    />
  )

  const registerPartyPlace = (event) => {
    event.preventDefault()

    const partyPlace = {
      cnpj: cnpjPartyPlace,
      name,
      postal_code,
      street,
      number,
      district,
      city,
      main_contact,
      cellphone,
      email,
      emailConfirmation,
      password,
      passwordConfirmation,
    }

    api
      .post('/party-places', { body: JSON.stringify(partyPlace) })
      .then((response) => {
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Cadastrado com sucesso',
            text2: `Bem vindo ${partyPlace.name}, por favor faça o login.`,
            onShow: () => navigation.navigate('Login'),
          })
        } else {
          throw new Error(response.body)
        }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Algo deu errado com a tentativa de cadastro!',
          text2: `${error}`,
        })
      })
  }

  const invalidConfirmation = (value, valueToCompare) => {
    if (!value || !valueToCompare) return false

    return value !== valueToCompare
  }

  const renderCaption = (shouldRender, message) => {
    return shouldRender ? (
      <View>
        <Text style={styles.captionText} status="danger">
          {message}
        </Text>
      </View>
    ) : null
  }

  const [name, setname] = React.useState('')
  const [cnpjPartyPlace, setcnpjPartyPlace] = React.useState('')
  const [postal_code, setpostal_code] = React.useState('')
  const [street, setstreet] = React.useState('')
  const [number, setnumber] = React.useState('')
  const [district, setDistrictPlace] = React.useState('')
  const [city, setCityPlace] = React.useState('')
  const [main_contact, setmain_contact] = React.useState('')
  const [phone, setPhonePlace] = React.useState('')
  const [cellphone, setcellphonePlace] = React.useState('')
  const [email, setEmailPlace] = React.useState('')
  const [emailConfirmation, setEmailConfirmationPlace] = React.useState('')
  const [password, setPasswordPlace] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmationPlace] =
    React.useState('')
  const [checked, setChecked] = React.useState(false)

  return (
    <Layout style={{ flex: 1, paddingTop: 20 }}>
      <TopNavigation
        title="Cadastro de estabelecimento"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />

      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.formContainer}>
            <Text category="s1">Informações do Estabelecimento</Text>

            <Input
              style={styles.inputContainer}
              label="Nome do estabelecimento"
              required={true}
              placeholder="Insira o nome do seu estabelecimento"
              value={name}
              onChangeText={(nextValue) => setname(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="CNPJ"
              caption={renderCaption(
                cnpjPartyPlace ? !cnpj.isValid(cnpjPartyPlace) : false,
                'CNPJ inválido!'
              )}
              required={true}
              placeholder="99.999.999/9999-99"
              value={cnpjPartyPlace}
              onChangeText={(nextValue) => setcnpjPartyPlace(nextValue)}
            />
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Endereço</Text>

            <Input
              style={styles.inputContainer}
              label="CEP"
              required={true}
              placeholder="99999-999"
              value={postal_code}
              onChangeText={(nextValue) => setpostal_code(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Logradouro"
              required={true}
              placeholder="Insira o Logradouro"
              value={street}
              onChangeText={(nextValue) => setstreet(nextValue)}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 1, marginRight: 5 }}
                label="Número"
                required={true}
                placeholder="Número"
                value={number}
                onChangeText={(nextValue) => setnumber(nextValue)}
              />

              <Input
                style={{ flex: 3, marginLeft: 5 }}
                label="Bairro"
                required={true}
                placeholder="Insira o bairro"
                value={district}
                onChangeText={(nextValue) => setDistrictPlace(nextValue)}
              />
            </Layout>
            <Input
              style={styles.inputContainer}
              label="Cidade"
              required={true}
              placeholder="Insira a cidade do seu estabelecimento"
              value={city}
              onChangeText={(nextValue) => setCityPlace(nextValue)}
            />
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Contato</Text>
            <Input
              style={styles.inputContainer}
              label="Nome completo do responsável"
              required={true}
              placeholder="Insira o nome do responsável do estabelecimento"
              value={main_contact}
              onChangeText={(nextValue) => setmain_contact(nextValue)}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 2, marginRight: 5 }}
                label="Telefone"
                placeholder="9999-9999"
                value={phone}
                onChangeText={(nextValue) => setPhonePlace(nextValue)}
              />
              <Input
                style={{ flex: 2, marginLeft: 5 }}
                label="Celular"
                required={true}
                placeholder="(99) 99999-9999"
                value={cellphone}
                onChangeText={(nextValue) => setcellphonePlace(nextValue)}
              />
            </Layout>
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Usuário</Text>
            <Input
              style={styles.inputContainer}
              label="E-mail"
              required={true}
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChangeText={(nextValue) => setEmailPlace(nextValue)}
              caption={renderCaption(
                invalidConfirmation(
                  email.toLowerCase(),
                  emailConfirmation.toLowerCase()
                ),
                'Os e-emails devem ser iguais!'
              )}
            />

            <Input
              style={styles.inputContainer}
              label="Confirmação de e-mail"
              required={true}
              placeholder="Digite a confirmação de e-mail"
              value={emailConfirmation}
              onChangeText={(nextValue) => setEmailConfirmationPlace(nextValue)}
              caption={renderCaption(
                invalidConfirmation(
                  email.toLowerCase(),
                  emailConfirmation.toLowerCase()
                ),
                'Os e-mails devem ser iguais!'
              )}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 2, marginRight: 5 }}
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                secureTextEntry={true}
                onChangeText={(nextValue) => setPasswordPlace(nextValue)}
                caption={renderCaption(
                  invalidConfirmation(password, passwordConfirmation),
                  'As senhas devem ser iguais!'
                )}
              />

              <Input
                style={{ flex: 2, marginLeft: 5 }}
                required={true}
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                secureTextEntry={true}
                value={passwordConfirmation}
                onChangeText={(nextValue) =>
                  setPasswordConfirmationPlace(nextValue)
                }
                caption={renderCaption(
                  invalidConfirmation(password, passwordConfirmation),
                  'As senhas devem ser iguais!'
                )}
              />
            </Layout>

            <Layout style={styles.radioTerms}>
              <Radio
                style={{ marginRight: 5 }}
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}>
                <Text
                  category="c1"
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                    Linking.openURL('https://reactnative.dev')
                  }}>
                  Termos de uso
                </Text>
              </Radio>
            </Layout>
          </Layout>
        </ScrollView>

        <Layout style={styles.submitButton}>
          <Button
            disabled={disableButton([
              name,
              cnpjPartyPlace,
              postal_code,
              street,
              number,
              district,
              city,
              main_contact,
              cellphone,
              email,
              emailConfirmation,
              email.toLowerCase() === emailConfirmation.toLowerCase(),
              password,
              passwordConfirmation,
              password === passwordConfirmation,
              checked,
              cnpj.isValid(cnpjPartyPlace),
            ])}
            onPress={registerPartyPlace}>
            Cadastrar Estabelecimento
          </Button>
        </Layout>
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formContainer: { paddingVertical: 20 },
  inputContainer: { paddingVertical: 5 },
  inputContainerRow: { paddingVertical: 5, flexDirection: 'row', flex: 1 },
  hyperlinkStyle: { fontStyle: 'italic', color: 'blue' },
  radioTerms: { flexDirection: 'row', flex: 1, marginTop: 20 },
  submitButton: { paddingVertical: 10 },

  captionText: {
    fontSize: 12,
    paddingTop: 5,
    fontWeight: '400',
  },

  submitButton: { paddingVertical: 10 },
})
