import { Button, Icon, Input, Layout, TopNavigation } from '@ui-kitten/components';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { NotFound } from '../../components/item-not-found';
import { LogoutAction } from '../../components/logout-action';
import { PartyPlaceCard } from '../../components/party-place-card';
import { ENV } from '../../config/envinroments';

export function SearchPartyScreen() {
  const userSession = useSelector((state) => state.userSession.value);

  const [isLoading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [partyPlaces, setPartyPlaces] = React.useState([]);

  const getPartyPlaces = async (partyPlaceName = null) => {
    setLoading(true);
    const queryParam = new URLSearchParams({ partyPlaceName });

    const api = `${ENV.BASE_URL}/party-places`;
    const url = partyPlaceName ? `${api}?${queryParam}` : api;

    // eslint-disable-next-line no-undef
    const headers = new Headers({
      Authorization: `Token ${userSession.token}`,
      'Content-Type': 'application/json',
    });

    try {
      const response = await fetch(url, { method: 'GET', headers });
      if (!response.ok) throw response;

      setPartyPlaces(await response.json());
    } catch (error) {
      if (error && error.status == 404) {
        setPartyPlaces([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterPartyPlace = async (partyPlaceName) => {
    await getPartyPlaces(partyPlaceName);
  };

  // TODO: Fix bug on remove []
  React.useEffect(() => {
    getPartyPlaces(searchText);
  }, []);

  const clearSearch = async () => {
    setSearchText('');
    setLoading(true);
    await getPartyPlaces();
    setLoading(false);
  };

  const renderClearButton = (searchText) => {
    if (!searchText) return;
    return <Icon name="close-outline" onPress={clearSearch} />;
  };

  const partyPlaceResults = () => {
    if (!partyPlaces.length) return <NotFound />;

    return (
      <FlatList
        data={partyPlaces}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <PartyPlaceCard partyPlace={item} />}
      />
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation title="Buscar" accessoryRight={LogoutAction} />

      <Layout style={{ flexDirection: 'row' }}>
        <Input
          style={{ margin: 5, flex: 9 }}
          value={searchText}
          placeholder="Faça a sua busca"
          accessoryRight={renderClearButton(searchText)}
          onChangeText={(nextValue) => setSearchText(nextValue)}
        />

        <Button
          style={{ flex: 1 }}
          size="medium"
          appearance="ghost"
          accessoryLeft={<Icon name="search-outline" />}
          onPress={() => filterPartyPlace(searchText)}
        />
      </Layout>

      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        {isLoading ? <ActivityIndicator /> : partyPlaceResults()}
      </Layout>
    </Layout>
  );
}
