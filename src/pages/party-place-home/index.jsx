import { Layout, Text, TopNavigation } from '@ui-kitten/components';
import React from 'react';
import { LogoutAction } from '../../components/logout-action';

export function PartyPlaceHomeScreen() {
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title="Home" accessoryRight={LogoutAction} />
      <Text category="s1">Area do estabelecimento</Text>
    </Layout>
  );
}
