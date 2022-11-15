import { Icon, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { NotFound } from '../../components/item-not-found';
import { LogoutAction } from '../../components/logout-action';
import { PartyPlaceCard } from '../../components/party-place-card';
import { UserProfileHeader } from '../../components/user-profile-header';
import { api } from '../../services/api';
import { styles } from './styles';

export function SearchPartyScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [partyPlaces, setPartyPlaces] = useState([]);

  const getPartyPlaces = async (partyPlaceName = null) => {
    setLoading(true);
    const queryParam = new URLSearchParams({ partyPlaceName });
    const url = partyPlaceName ? `/party-places?${queryParam}` : '/party-places';

    try {
      const response = await api.get(url);
      if (!response.ok) throw response;

      setPartyPlaces(await response.body);
    } catch (error) {
      if (error && error.status == 404) {
        setPartyPlaces([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartyPlaces(searchText);
  }, [searchText]);

  const clearSearch = async () => {
    setSearchText('');
    setLoading(true);
    await getPartyPlaces();
    setLoading(false);
  };

  const renderClearButton = () => {
    if (searchText) {
      return <Icon name="close-outline" onPress={clearSearch} />;
    } else {
      return <Icon name="search-outline" />;
    }
  };

  const partyPlaceResults = () => {
    if (!partyPlaces.length) return <NotFound />;

    return (
      <FlatList
        data={partyPlaces}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <PartyPlaceCard partyPlace={item} navigation={navigation} />}
      />
    );
  };

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
      <TopNavigation title={UserProfileHeader} accessoryRight={LogoutAction} />

      <Layout style={{ flexDirection: 'row' }}>
        <Input
          style={styles.inputSearch}
          value={searchText}
          accessoryRight={renderClearButton()}
          placeholder="Faça a sua busca"
          onChangeText={(nextValue) => setSearchText(nextValue)}
        />
      </Layout>

      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        {isLoading ? <ActivityIndicator /> : partyPlaceResults()}
      </Layout>
    </Layout>
  );
}
