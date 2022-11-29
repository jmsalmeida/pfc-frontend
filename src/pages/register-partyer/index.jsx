import moment from 'moment';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

import {
  Button,
  Datepicker,
  Divider,
  Icon,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { ScrollView, View } from 'react-native';
import { api } from '../../services/api';
import { disableButton } from '../../util/utils';
import { styles } from './styles';

export function RegisterPartyerScreen({ navigation }) {
  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName) => <Icon name={iconName} />;

  function BackAction() {
    return <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack} />;
  }

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const genders = ['Feminino', 'Masculino', 'Outro'];
  const [selectedIndex, setSelectedIndex] = useState();
  const [whileRegistering, setWhileRegistering] = useState(false);

  const renderOption = (title) => <SelectItem key={title} title={title} />;

  const registerPartyer = async (event) => {
    event.preventDefault();

    const newUser = {
      user: { email, password },
      partyer: {
        name: `${name} ${lastName}`,
        gender: genders[selectedIndex.row],
        birthDate,
      },
    };

    try {
      setWhileRegistering(true);

      const response = await api.post('/auth/signup/partyer', {
        body: JSON.stringify({ registerPartyer: { ...newUser } }),
      });
      if (!response.ok) throw response;

      const { name } = newUser.partyer;
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
        text2: `${errorMessage}`,
      });
    } finally {
      setWhileRegistering(false);
    }
  };

  const invalidConfirmation = (value, valueToCompare) => {
    if (!value || !valueToCompare) return false;

    return value !== valueToCompare;
  };

  const isUnderAge = (userBirthDate) => {
    const today = moment();
    userBirthDate = moment(userBirthDate);

    return today.diff(userBirthDate, 'years') < 18;
  };

  const renderCaption = (shouldRender, message) =>
    shouldRender ? (
      <View>
        <Text style={styles.captionText} status="danger">
          {message}
        </Text>
      </View>
    ) : null;

  const displayOption = (list, option) => {
    if (!option) return;
    return list[option.row];
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title="Cadastro de usuário" alignment="center" accessoryLeft={BackAction} />
      <Divider />

      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.formContainer}>
            <Text category="s1">Informações pessoais</Text>

            <Input
              style={styles.inputContainer}
              label="Nome"
              required
              placeholder="Insira o seu nome"
              value={name}
              onChangeText={(nextValue) => setName(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Sobrenome"
              required
              placeholder="Insira o seu sobrenome"
              value={lastName}
              onChangeText={(nextValue) => setLastName(nextValue)}
            />

            <Datepicker
              style={styles.inputContainer}
              label="Data de nascimento"
              date={birthDate}
              min={new Date(1900, 0, 0)}
              accessoryRight={generateIcon('calendar')}
              onSelect={(nextDate) => setBirthDate(nextDate)}
              caption={renderCaption(
                isUnderAge(birthDate),
                'Não é permitido o cadastro de menores de idade',
              )}
            />

            <Select
              style={styles.inputContainer}
              label="Sexo"
              placeholder="Selecione o sexo"
              value={displayOption(genders, selectedIndex)}
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
            >
              {genders.map(renderOption)}
            </Select>
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category="s1">Informações de acesso</Text>

            <Input
              style={styles.inputContainer}
              label="Email"
              placeholder="Digite seu melhor email"
              value={email}
              caption={renderCaption(
                invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()),
                'Email deve ser igual a confirmação',
              )}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Confirmação de email"
              placeholder="Digite a confirmação de email"
              value={emailConfirmation}
              caption={renderCaption(
                invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()),
                'Email deve ser igual a confirmação',
              )}
              onChangeText={(nextValue) => setEmailConfirmation(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Senha"
              placeholder="Digite a sua senha"
              value={password}
              secureTextEntry
              caption={renderCaption(
                invalidConfirmation(password, passwordConfirmation),
                'Senha deve ser igual a confirmação',
              )}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />

            <Input
              style={styles.inputContainer}
              label="Confirmar Senha"
              placeholder="Digite a confirmação da senha"
              value={passwordConfirmation}
              secureTextEntry
              caption={renderCaption(
                invalidConfirmation(password, passwordConfirmation),
                'Senha deve ser igual a confirmação',
              )}
              onChangeText={(nextValue) => setPasswordConfirmation(nextValue)}
            />
          </Layout>
        </ScrollView>

        <Layout style={styles.submitButton}>
          <Button
            disabled={
              disableButton([
                name,
                lastName,
                selectedIndex,
                password,
                passwordConfirmation,
                !isUnderAge(birthDate),
                password === passwordConfirmation,
                email.toLowerCase() == emailConfirmation.toLowerCase(),
              ]) || whileRegistering
            }
            onPress={registerPartyer}
          >
            cadastrar usuário
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
}
