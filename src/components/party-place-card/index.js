import React from 'react'
import { Text, Layout, Card, Avatar, Button, Icon } from '@ui-kitten/components'

export const PartyPlaceCard = ({ partyPlace }) => {
  const Footer = (props) => (
    <Layout {...props} style={{ alignItems: 'flex-end' }}>
      <Button
      size='small'
      appearance='ghost'
      accessoryRight={<Icon name="arrow-forward-outline" />}>
        Detalhes
      </Button>
    </Layout>
  )

  return (
    <Card style={{ margin: 4 }} footer={Footer}>
      <Layout style={{ flexDirection: 'row' }}>
        <Layout style={{ flex: 2 }}>
          <Avatar
          size='giant'
          source={require('../../assets/logo.png')} />
        </Layout>

        <Layout style={{ flex: 6 }}>
          <Text category='h6'>{partyPlace.name}</Text>
        </Layout>
      </Layout>
    </Card>
  )
}