import { Icon, Input, Layout, Text, Button, Divider, TopNavigation } from '@ui-kitten/components';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { NotFound } from '../../components/item-not-found';
import { LogoutAction } from '../../components/logout-action';
import { PartyPlaceCard } from '../../components/party-place-card';
import { UserProfileHeader } from '../../components/user-profile-header';
import { api } from '../../services/api';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';
import { AdvancedFilters } from './advanced-filters';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

export function SearchPartyScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [partyPlaces, setPartyPlaces] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [foodTypeList, setFoodTypeList] = useState([]);
  const [drinkTypeList, setDrinkTypeList] = useState([]);
  const [partyTypeList, setPartyTypeList] = useState([]);
  const [musicStyleList, setMusicStyleList] = useState([]);

  const getPartyPlaces = async (url = '/party-places') => {
    setLoading(true);

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

  const _setAdvancedFilters = useCallback(() => {
    setAppliedFilters([...foodTypeList, ...drinkTypeList, ...partyTypeList, ...musicStyleList]);
    setShowAdvancedFilters(false);
  }, [drinkTypeList, foodTypeList, musicStyleList, partyTypeList]);

  const filterPartyPlaces = useCallback(async () => {
    let queryParams = {};
    if (!isEmpty(searchText)) queryParams['partyPlaceName'] = searchText;
    if (!isEmpty(appliedFilters)) queryParams['partyFeatures'] = appliedFilters;

    queryParams = new URLSearchParams(queryParams);
    const url = `/party-places?${queryParams.toString()}`;
    await getPartyPlaces(url);
  }, [searchText, appliedFilters]);

  const debouncedFilterPartyPlaces = useMemo(
    () => debounce(filterPartyPlaces, 500),
    [filterPartyPlaces],
  );

  useEffect(() => {
    if (isEmpty(searchText) && isEmpty(appliedFilters)) {
      getPartyPlaces();
    } else {
      isEmpty(searchText) ? filterPartyPlaces() : debouncedFilterPartyPlaces();
    }
  }, [searchText, debouncedFilterPartyPlaces, appliedFilters, filterPartyPlaces]);

  const clearFilters = () => {
    setSearchText('');
    setFoodTypeList([]);
    setPartyTypeList([]);
    setDrinkTypeList([]);
    setMusicStyleList([]);
    setAppliedFilters([]);
  };

  const renderClearButton = () =>
    searchText && <Icon name="close-outline" onPress={() => setSearchText('')} />;

  const partyPlaceResults = () => {
    if (!partyPlaces.length) return <NotFound />;

    return (
      <View>
        <Text category="s2">{partyPlaces.length} resultados</Text>

        <FlatList
          data={partyPlaces}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <PartyPlaceCard partyPlace={item} navigation={navigation} />}
        />
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
      <TopNavigation title={UserProfileHeader} accessoryRight={LogoutAction} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}
      >
        <Input
          style={styles.inputSearch}
          value={searchText}
          accessoryLeft={<Icon name="search-outline" />}
          accessoryRight={renderClearButton()}
          placeholder="Faça a sua busca"
          onChangeText={(nextValue) => setSearchText(nextValue)}
        />

        <TouchableOpacity
          style={styles.advancedFiltersButton}
          onPress={() => setShowAdvancedFilters(true)}
        >
          <Icon style={{ width: 16, height: 16, margin: 8 }} name="options-outline" fill="#fff" />
        </TouchableOpacity>
      </View>

      {!isEmpty(appliedFilters) && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text category="s2">
              {appliedFilters.length}{' '}
              {appliedFilters.length > 1 ? 'filtros aplicados' : 'filtro aplicado'}
            </Text>

            <Button
              size="tiny"
              status="danger"
              appearance="ghost"
              onPress={() => clearFilters()}
              accessoryRight={<Icon name="trash-2-outline" />}
            >
              limpar filtros
            </Button>
          </View>

          <Divider style={{ marginBottom: 20 }} />
        </View>
      )}

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          partyPlaceResults()
        )}
      </View>

      <AdvancedFilters
        foodTypeList={foodTypeList}
        setFoodTypeList={setFoodTypeList}
        drinkTypeList={drinkTypeList}
        setDrinkTypeList={setDrinkTypeList}
        musicStyleList={musicStyleList}
        setMusicStyleList={setMusicStyleList}
        partyTypeList={partyTypeList}
        setPartyTypeList={setPartyTypeList}
        isVisible={showAdvancedFilters}
        applyFilters={_setAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
      />
    </Layout>
  );
}
