import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Components/Login/login.component';
import { SearchPartyScreen } from '../Components/SearchParty/search-party.component';
import { RegisterPartyerScreen } from '../Components/Register/RegisterPartyer/register-partyer.component';
import { RegisterPartyPlaceScreen } from '../Components/Register/RegisterPartyer/register-party-place.component';
import { SelectUserTypeScreen } from '../Components/Register/Select-user-type/select-user-type.component';

import { useSelector } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

const LoginNavigator = () => {
  const userSession = useSelector(state => state.userSession.value)

  return (
    (userSession && userSession.token) ? (
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name='SearchParty' component={SearchPartyScreen} />
      </Navigator>
    ) : (
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name='Login' component={LoginScreen}/>
        <Screen name='SelectUserType' component={SelectUserTypeScreen} />
        <Screen name='RegisterPartyer' component={RegisterPartyerScreen} />
        <Screen name='RegisterPartyPlace' component={RegisterPartyPlaceScreen} />
      </Navigator>
    )
  )
}

export const AppNavigator = () => (
  <NavigationContainer>
    <LoginNavigator/>
  </NavigationContainer>
);