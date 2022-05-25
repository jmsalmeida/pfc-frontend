import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Components/Login/login.component';
import { RegisterPartyerScreen } from '../Components/RegisterPartyer/register-partyer.component';
import { SearchPartyScreen } from '../Components/SearchParty/search-party.component';

const { Navigator, Screen } = createStackNavigator();

const LoginNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='RegisterPartyer' component={RegisterPartyerScreen} />
    <Screen name='SearchParty' component={SearchPartyScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <LoginNavigator/>
  </NavigationContainer>
);