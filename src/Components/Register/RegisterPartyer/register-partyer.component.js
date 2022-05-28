import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-toast-message';

import { useMutation } from 'react-query';
import { disableButton } from '../../../util/utils';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Icon,
  Text,
  Input,
  Layout,
  Button,
  Select,
  Divider,
  SelectItem,
  Datepicker,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

export const RegisterPartyerScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const generateIcon = (iconName) => (
    <Icon name={iconName} />
  )

  const BackAction = () => (
    <TopNavigationAction icon={generateIcon('arrow-back')} onPress={navigateBack}/>
  );

  // TODO: Improve state declarations
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailConfirmation, setEmailConfirmation] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')

  // Gender option
  const genders = ['Feminino' ,'Masculino', 'Outro'];
  const [selectedIndex, setSelectedIndex] = React.useState();

  const renderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  const registerPartyer = (newPartyer) => {
    axios.post('http://localhost:3000/partyers', newPartyer)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Cadastrado com sucesso',
        text2: `Bem vindo ${newPartyer.name}, por favor faça o login.`,
        onShow: () => navigation.navigate('Login')
      });
    }).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        // TODO: Use api error messages
        text2: 'Algo deu errado com a tentativa de cadastro!'
      });
    });
  }

  const mutation = useMutation(registerPartyer);

  const invalidConfirmation = (value, valueToCompare) => {
    if (!value || !valueToCompare) return false;

    return value !== valueToCompare;
  }

  const isUnderAge = (userBirthDate) => {
    const today = moment();
    userBirthDate = moment(userBirthDate);

    return today.diff(userBirthDate, 'years') < 18;
  }

  const renderCaption = (shouldRender, message) => {
    return (
    shouldRender ?
      <View>
        <Text style={styles.captionText} status="danger">{message}</Text>
      </View>
      :
      null
    )
  }

  const displayOption = (list, option) => {
    if (!option) return;
    return list[option.row];
  }

  return (
    <Layout style={{ flex: 1, paddingTop: 20 }}>
      <TopNavigation title='Cadastro de usuário' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
  
      <Layout style={styles.container}>
        <ScrollView>
          <Layout style={styles.formContainer}>
            <Text category='s1'>Informações pessoais</Text>

            <Input style={styles.inputContainer}
              label='Nome'
              required={true}
              placeholder='Insira o seu nome'
              value={name}
              onChangeText={nextValue => setName(nextValue)}
            />

            <Input style={styles.inputContainer}
              label='Sobrenome'
              required={true}
              placeholder='Insira o seu sobrenome'
              value={lastName}
              onChangeText={nextValue => setLastName(nextValue)}
            />

            <Datepicker style={styles.inputContainer}
              label='Data de nascimento'
              date={birthDate}
              min={new Date(1900, 0, 0)}
              accessoryRight={generateIcon('calendar')}
              onSelect={nextDate => setBirthDate(nextDate)}
              caption={renderCaption(isUnderAge(birthDate), 'Não é permitido o cadastro de menores de idade')}
            />

            <Select style={styles.inputContainer}
              label='Sexo'
              placeholder='Selecione o sexo'
              value={displayOption(genders , selectedIndex)}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              {genders.map(renderOption)}
            </Select>
          </Layout>

          <Layout style={styles.formContainer}>
            <Text category='s1'>Informações de acesso</Text>

            <Input style={styles.inputContainer}
              label='Email'
              placeholder='Digite seu melhor email'
              value={email}
              caption={renderCaption(invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()), "Email deve ser igual a confirmação")}
              onChangeText={nextValue => setEmail(nextValue)}
            />

            <Input style={styles.inputContainer}
              label='Confirmação de email'
              placeholder='Digite a confirmação de email'
              value={emailConfirmation}
              caption={renderCaption(invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase()), "Email deve ser igual a confirmação")}
              onChangeText={nextValue => setEmailConfirmation(nextValue)}
            />

            <Input style={styles.inputContainer}
              label='Senha'
              placeholder='Digite a sua senha'
              value={password}
              secureTextEntry={true}
              caption={renderCaption(invalidConfirmation(password, passwordConfirmation), "Senha deve ser igual a confirmação")}
              onChangeText={nextValue => setPassword(nextValue)}
            />

            <Input style={styles.inputContainer}
              label='Confirmar Senha'
              placeholder='Digite a confirmação da senha'
              value={passwordConfirmation}
              secureTextEntry={true}
              caption={renderCaption(invalidConfirmation(password, passwordConfirmation), "Senha deve ser igual a confirmação")}
              onChangeText={nextValue => setPasswordConfirmation(nextValue)}
            />
          </Layout>
        </ScrollView>

        <Layout style={styles.submitButton}>
          <Button
            disabled={disableButton([
              name, lastName, selectedIndex, password, passwordConfirmation,
              !isUnderAge(birthDate),
              (password === passwordConfirmation),
              !invalidConfirmation(email.toLowerCase(), emailConfirmation.toLowerCase())
            ])}
            onPress={() => mutation.mutate({
              name: `${name} ${lastName}`,
              gender: genders[selectedIndex.row],
              birthDate, email, emailConfirmation, password, passwordConfirmation
            })}
          >
            cadastrar usuário
          </Button>

        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },

  formContainer: { paddingVertical: 20 },
  inputContainer: { paddingVertical: 5 },

  captionText: {
    fontSize: 12,
    paddingTop: 5,
    fontWeight: "400"
  },

  submitButton: { paddingVertical: 10 }
});