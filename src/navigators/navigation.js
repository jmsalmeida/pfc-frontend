import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../pages/login'
import { SearchPartyScreen } from '../pages/search-party'
import { RegisterPartyerScreen } from '../pages/register-partyer'
import { RegisterPartyPlaceScreen } from '../pages/register-party-place'
import { SelectUserTypeScreen } from '../pages/select-user-type'

import { useSelector } from 'react-redux'

const { Navigator, Screen } = createStackNavigator()

const LoginNavigator = () => {
  const userSession = useSelector((state) => state.userSession.value)

  return userSession && userSession.token ? (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SearchParty" component={SearchPartyScreen} />
    </Navigator>
  ) : (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="SelectUserType" component={SelectUserTypeScreen} />
      <Screen name="RegisterPartyer" component={RegisterPartyerScreen} />
      <Screen name="RegisterPartyPlace" component={RegisterPartyPlaceScreen} />
    </Navigator>
  )
}

export const AppNavigator = () => (
  <NavigationContainer>
    <LoginNavigator />
  </NavigationContainer>
)
