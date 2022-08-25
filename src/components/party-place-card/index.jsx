import { Avatar, Button, Card, Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react';

export function PartyPlaceCard({ partyPlace }) {
  function Footer(props) {
    return (
      <Layout {...props} style={{ alignItems: 'flex-end' }}>
        <Button
          size="small"
          appearance="ghost"
          accessoryRight={<Icon name="arrow-forward-outline" />}
        >
          Detalhes
        </Button>
      </Layout>
    );
  }

  return (
    <Card style={{ margin: 4 }} footer={Footer}>
      <Layout style={{ flexDirection: 'row' }}>
        <Layout style={{ flex: 2 }}>
          <Avatar size="giant" source={require('../../assets/logo.png')} />
        </Layout>

        <Layout style={{ flex: 6 }}>
          <Text category="h6">{partyPlace.name}</Text>
        </Layout>
      </Layout>
    </Card>
  );
}
