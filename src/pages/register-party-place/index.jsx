import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Radio,
  Text,
  TopNavigation,
  // eslint-disable-next-line prettier/prettier
  TopNavigationAction
} from '@ui-kitten/components';
import React from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-toast-message';
import { api } from '../../services/api';
import { disableButton } from '../../util/utils';
import { styles } from './styles';

export function RegisterPartyPlaceScreen({ navigation }) {
  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName) => <Icon name={iconName} />;

  function BackAction() {
    return <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack} />;
  }

  const registerPartyPlace = (event) => {
    event.preventDefault();

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
    };

    api
      .post('/party-places', { body: JSON.stringify(partyPlace) })
      .then((response) => {
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Cadastrado com sucesso',
            text2: `Bem vindo ${partyPlace.name}, por favor faça o login.`,
            onShow: () => navigation.navigate('Login'),
          });
        } else {
          throw new Error(response.body);
        }
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Algo deu errado com a tentativa de cadastro!',
          text2: `${error}`,
        });
      });
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
  /* função para checar se está retornando o CNPJ do GitHub sem mascara e válido
  function showCnpj() {
    const unmasked = this.cnpjField.getRawValue();
    const cnpjIsValid = this.cnpjField.getRawValue()
    alert(unmasked);
    alert(cnpjIsValid);
  }
  */
  /* função para checar se está retornando o CNPJ do vídeo sem mascara e válido
  function showCnpj() {
    const unmask = cnpjRef?.current.getRawValue();
    const cnpjIsValid = cnpjRef?.current.isValid();
    alert(unmask);
    alert(cnpjIsValid);
  }
  */

  const [name, setname] = React.useState('');
  const [cnpjPartyPlace, setcnpjPartyPlace] = React.useState('');
  const [postal_code, setpostal_code] = React.useState('');
  const [street, setstreet] = React.useState('');
  const [number, setnumber] = React.useState('');
  const [district, setDistrictPlace] = React.useState('');
  const [city, setCityPlace] = React.useState('');
  const [main_contact, setmain_contact] = React.useState('');
  const [phone, setPhonePlace] = React.useState('');
  const [cellphone, setcellphonePlace] = React.useState('');
  const [email, setEmailPlace] = React.useState('');
  const [emailConfirmation, setEmailConfirmationPlace] = React.useState('');
  const [password, setPasswordPlace] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmationPlace] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  //const cnpjRef = useRef(null);

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
              onChangeText={(nextValue) => setname(nextValue)}
            />

            <Text style={styles.inputTitle} category="c1">
              CNPJ
            </Text>

            <TextInputMask
              style={styles.inputContainerMask}
              type={'cnpj'}
              value={cnpjPartyPlace}
              onChangeText={(nextValue) => setcnpjPartyPlace(nextValue)}
              placeholder="99.999.999/9999-99"
              /* Dois tipo de referencia, a primeira de um vídeo a segunda do gitHub
              ref=(cnpjRef)
              ref={(ref) => this.cnpjField = ref}
              */
              /*
              Caption para renderizar a validação através do método isValid()
              caption={renderCaption(
              )}
              */
            />
          </Layout>
          <Layout style={styles.formContainer}>
            <Text category="s1">Endereço</Text>

            <Text style={styles.inputTitle} category="c1">
              CEP
            </Text>

            <TextInputMask
              style={styles.inputContainerMask}
              type={'zip-code'}
              value={postal_code}
              onChangeText={(nextValue) => setpostal_code(nextValue)}
              placeholder="99999-999"
            />

            <Input
              style={styles.inputContainer}
              label="Logradouro"
              required
              placeholder="Insira o Logradouro"
              value={street}
              onChangeText={(nextValue) => setstreet(nextValue)}
            />

            <Layout style={styles.inputContainerRow}>
              <Input
                style={{ flex: 1, marginRight: 5 }}
                label="Número"
                required
                placeholder="Número"
                value={number}
                onChangeText={(nextValue) => setnumber(nextValue)}
                keyboardType="number-pad"
              />

              <Input
                style={{ flex: 3, marginLeft: 5 }}
                label="Bairro"
                required
                placeholder="Insira o bairro"
                value={district}
                onChangeText={(nextValue) => setDistrictPlace(nextValue)}
              />
            </Layout>
            <Input
              style={styles.inputContainer}
              label="Cidade"
              required
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
              required
              placeholder="Insira o nome do responsável do estabelecimento"
              value={main_contact}
              onChangeText={(nextValue) => setmain_contact(nextValue)}
            />

            <Text style={styles.inputTitle} category="c1">
              Telefone
            </Text>

            <TextInputMask
              style={styles.inputContainerMask}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={phone}
              onChangeText={(nextValue) => setPhonePlace(nextValue)}
              placeholder="(99) 99999-999"
            />

            <Text style={styles.inputTitle} category="c1">
              Celular
            </Text>

            <TextInputMask
              style={styles.inputContainerMask}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={cellphone}
              onChangeText={(nextValue) => setcellphonePlace(nextValue)}
              placeholder="(88) 88888-8888"
              required
            />
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Usuário</Text>
            <Input
              style={styles.inputContainer}
              label="E-mail"
              required
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChangeText={(nextValue) => setEmailPlace(nextValue)}
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
              onChangeText={(nextValue) => setEmailConfirmationPlace(nextValue)}
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
                onChangeText={(nextValue) => setPasswordPlace(nextValue)}
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
                onChangeText={(nextValue) => setPasswordConfirmationPlace(nextValue)}
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
              //cnpj.isValid(cnpjPartyPlace),
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
