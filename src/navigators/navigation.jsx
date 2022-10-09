import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { LoginScreen } from '../pages/login';
import { PartyPlaceHomeScreen } from '../pages/party-place-home';
import { RegisterPartyPlaceScreen } from '../pages/register-party-place';
import { RegisterPartyerScreen } from '../pages/register-partyer';
import { SearchPartyScreen } from '../pages/search-party';
import { SelectUserTypeScreen } from '../pages/select-user-type';
import { PartyPlaceScreen } from '../pages/party-place';

const { Navigator, Screen } = createStackNavigator();

function LoginNavigator() {
  const userToken = useSelector((state) => state.userSession.token);
  const currentUser = useSelector((state) => state.userSession.currentUser);

  const renderExpectedUserArea = () => {
    return currentUser['user_type'] === 'party_place' ? (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="PartyPlaceHome" component={PartyPlaceHomeScreen} />
      </Navigator>
    ) : (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SearchParty" component={SearchPartyScreen} />
        <Screen name="PartyPlace" component={PartyPlaceScreen} />
      </Navigator>
    );
  };

  return currentUser && userToken ? (
    renderExpectedUserArea()
  ) : (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="SelectUserType" component={SelectUserTypeScreen} />
      <Screen name="RegisterPartyer" component={RegisterPartyerScreen} />
      <Screen name="RegisterPartyPlace" component={RegisterPartyPlaceScreen} />
    </Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
}
