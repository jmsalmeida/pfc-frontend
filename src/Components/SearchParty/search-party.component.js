import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserToken } from '../../reducers/application.js';
import { ActivityIndicator, FlatList } from 'react-native';
import { Text, Layout, Button, TopNavigation, Divider } from '@ui-kitten/components';

export const SearchPartyScreen = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [partyPlaces, setPartyPlaces] = React.useState([]);

  const userToken = useSelector(state => state.userToken.value);


  const logoutUser = async (event) => {
    event.preventDefault();

    // TODO: Invalidate user token
    const dispatch = useDispatch();
    dispatch(clearUserToken());
  }

  const getPartyPlaces = async () => {
    const headers = new Headers({
      'Authorization': `Token ${userToken}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await fetch('http://localhost:3000/partyers', { method: 'GET', headers });
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

      <Button onPress={logoutUser}>
        Sair
      </Button>
    </Layout>
  )
}