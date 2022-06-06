import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, FlatList } from 'react-native';
import { Text, Layout, TopNavigation, Divider } from '@ui-kitten/components';
import { LogoutAction } from '../../Components/Logout/logout-action.component';

export const SearchPartyScreen = () => {
  const userSession = useSelector(state => state.userSession.value);

  const [isLoading, setLoading] = React.useState(true);
  const [partyPlaces, setPartyPlaces] = React.useState([]);

  const getPartyPlaces = async () => {
    const headers = new Headers({
      'Authorization': `Token ${userSession.token}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await fetch('http://localhost:3000/party-places', { method: 'GET', headers });
      if (!response.ok) throw response;

      setPartyPlaces(await response.json());
    } catch(error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getPartyPlaces();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title='Buscar lugares' alignment='center' />
      <Divider/>

      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={partyPlaces}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />)
      }

      <LogoutAction />
    </Layout>
  )
}