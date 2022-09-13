import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Radio,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { cnpj } from 'cpf-cnpj-validator';
import React from 'react';
import { Linking, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { api } from '../../services/api';
import { disableButton } from '../../util/utils';
import { styles } from './styles';
import { InputWithMask } from '../../components/input-with-mask';

export function RegisterPartyPlaceScreen({ navigation }) {
  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName) => <Icon name={iconName} />;

  function BackAction() {
    return <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack} />;
  }

  const registerPartyPlace = async (event) => {
    event.preventDefault();

    const newUser = {
      user: { email, password },
      partyPlace: {
        cnpj: partyPlaceCnpj,
        name,
        mainContact,
        phone,
        cellphone,
      },
      address: {
        postalCode,
        street,
        placeNumber,
        district,
        city,
      },
    };

    try {
      const response = await api.post('/auth/signup/party-place', {
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw response;

      const { name } = newUser.partyPlace;
      Toast.show({
        type: 'success',
        text1: 'Cadastrado com sucesso',
        text2: `Bem vindo ${name}, por favor faça o login.`,
        onShow: () => navigation.navigate('Login'),
      });
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado com o cadastro!',
        text2: errorMessage,
      });
    }
  };

  const invalidConfirmation = (value, valueToCompare) => {
    if (!value || !valueToCompare) return false;

    return value !== valueToCompare;
  };

  const renderCaption = (shouldRender, message) =>
    shouldRender ? (
      <View>
        <Text style={styles.captionText} status="danger">
          {message}
        </Text>
      </View>
    ) : null;

  const [name, setName] = React.useState('');
  const [partyPlaceCnpj, setPartyPlaceCnpj] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [placeNumber, setPlaceNumber] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [city, setCity] = React.useState('');
  const [mainContact, setMainContact] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [cellphone, setCellphone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailConfirmation, setEmailConfirmation] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [checked, setChecked] = React.useState(false);

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
              required
              placeholder="Insira o nome do seu estabelecimento"
              value={name}
              onChangeText={(nextValue) => setName(nextValue)}
            />

            <InputWithMask
              mask="cnpj"
              onMask={(unmaskedValue) => setPartyPlaceCnpj(unmaskedValue)}
              style={styles.inputContainer}
              label="CNPJ"
              caption={renderCaption(
                partyPlaceCnpj ? !cnpj.isValid(partyPlaceCnpj) : false,
                'CNPJ inválido!',
              )}
              required
              placeholder="99.999.999/9999-99"
            />
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Endereço</Text>

            <Input
              style={styles.inputContainer}
              label="CEP"
              required
              placeholder="99999-999"
              value={postalCode}
              onChangeText={(nextValue) => setPostalCode(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Logradouro"
              required
              placeholder="Insira o Logradouro"
              value={street}
              onChangeText={(nextValue) => setStreet(nextValue)}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 1, marginRight: 5 }}
                label="Número"
                required
                placeholder="Número"
                value={placeNumber}
                onChangeText={(nextValue) => setPlaceNumber(nextValue)}
              />

              <Input
                style={{ flex: 3, marginLeft: 5 }}
                label="Bairro"
                required
                placeholder="Insira o bairro"
                value={district}
                onChangeText={(nextValue) => setDistrict(nextValue)}
              />
            </Layout>
            <Input
              style={styles.inputContainer}
              label="Cidade"
              required
              placeholder="Insira a cidade do seu estabelecimento"
              value={city}
              onChangeText={(nextValue) => setCity(nextValue)}
            />
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Contato</Text>
            <Input
              style={styles.inputContainer}
              label="Nome completo do responsável"
              required
              placeholder="Insira o nome do responsável do estabelecimento"
              value={mainContact}
              onChangeText={(nextValue) => setMainContact(nextValue)}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 2, marginRight: 5 }}
                label="Telefone"
                placeholder="9999-9999"
                value={phone}
                onChangeText={(nextValue) => setPhone(nextValue)}
              />
              <Input
                style={{ flex: 2, marginLeft: 5 }}
                label="Celular"
                required
                placeholder="(99) 99999-9999"
                value={cellphone}
                onChangeText={(nextValue) => setCellphone(nextValue)}
              />
            </Layout>
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Usuário</Text>
            <Input
              style={styles.inputContainer}
              label="E-mail"
              required
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
              caption={renderCaption(
                invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()),
                'Os e-emails devem ser iguais!',
              )}
            />

            <Input
              style={styles.inputContainer}
              label="Confirmação de e-mail"
              required
              placeholder="Digite a confirmação de e-mail"
              value={emailConfirmation}
              onChangeText={(nextValue) => setEmailConfirmation(nextValue)}
              caption={renderCaption(
                invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()),
                'Os e-mails devem ser iguais!',
              )}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 2, marginRight: 5 }}
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                secureTextEntry
                onChangeText={(nextValue) => setPassword(nextValue)}
                caption={renderCaption(
                  invalidConfirmation(password, passwordConfirmation),
                  'As senhas devem ser iguais!',
                )}
              />

              <Input
                style={{ flex: 2, marginLeft: 5 }}
                required
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={(nextValue) => setPasswordConfirmation(nextValue)}
                caption={renderCaption(
                  invalidConfirmation(password, passwordConfirmation),
                  'As senhas devem ser iguais!',
                )}
              />
            </Layout>

            <Layout style={styles.radioTerms}>
              <Radio
                style={{ marginRight: 5 }}
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
              >
                <Text
                  category="c1"
                  style={styles.hyperlinkStyle}
                  onPress={() => {
                    Linking.openURL('https://reactnative.dev');
                  }}
                >
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
              partyPlaceCnpj,
              postalCode,
              street,
              placeNumber,
              district,
              city,
              mainContact,
              cellphone,
              email,
              emailConfirmation,
              email.toLowerCase() === emailConfirmation.toLowerCase(),
              password,
              passwordConfirmation,
              password === passwordConfirmation,
              checked,
              cnpj.isValid(partyPlaceCnpj),
            ])}
            onPress={registerPartyPlace}
          >
            Cadastrar Estabelecimento
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}
