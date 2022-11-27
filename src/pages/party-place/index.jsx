import { useEffect, useState, useCallback } from 'react';
import {
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
  Spinner,
} from '@ui-kitten/components';
import { View, Image, ScrollView } from 'react-native';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import { Checkin } from '../../components/checkin';
import isEmpty from 'lodash/isEmpty';
import { Tag } from '../../components/Tag';

export function PartyPlaceScreen({ route, navigation }) {
  const { placeId } = route.params;

  const navigateSearchParty = useCallback(() => {
    navigation.navigate('SearchParty');
  }, [navigation]);

  const [partyPlace, setPartyPlace] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPartyPlace = useCallback(async () => {
    const url = `party-places/${placeId}`;

    try {
      let response = await api.get(url);
      if (!response.ok) throw response;

      response = await response.body;
      setPartyPlace(response);
    } catch (error) {
      if (error.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Local não encontrado',
          onHide: () => navigateSearchParty(),
        });
      }
    } finally {
      setLoading(false);
    }
  }, [navigateSearchParty, placeId]);

  useEffect(() => {
    fetchPartyPlace();
  }, [fetchPartyPlace]);

  const renderPartyFeatures = () => {
    const features = partyPlace.party_features;

    if (!features.completed) {
      return (
        <View style={{ alignContent: 'center', alignItems: 'center', paddingVertical: 50 }}>
          <Text category="h6">Informações não fornecidas</Text>
          <Text category="s2">O estabelecimento ainda não concluiu o seu cadastro</Text>
        </View>
      );
    } else {
      return (
        <View style={{ marginVertical: 20 }}>
          <Divider />
          <Text category="h6" style={{ marginVertical: 10, marginLeft: 8 }}>
            Caracteristicas do local
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {features?.available_tables && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../assets/chair.png')}
                />

                <Text category="p1">Mesas disponíveis</Text>
              </View>
            )}

            {features?.smoke_place && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../assets/cigarette.png')}
                />

                <Text category="p1">Àrea para fumantes</Text>
              </View>
            )}
          </View>

          {!isEmpty(features?.party_type_list) && (
            <View style={{ marginTop: 20 }}>
              <Text category="h6" style={{ marginVertical: 10, marginLeft: 8 }}>
                Tipo de ambiente
              </Text>

              <View
                style={{
                  marginTop: 5,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
              >
                {features?.party_type_list.map((partyType) => (
                  <Tag key={`${partyType}-type`} content={partyType} isSelected={true} />
                ))}
              </View>
            </View>
          )}

          {!isEmpty(features?.drink_type_list) && (
            <View style={{ marginTop: 20 }}>
              <Text category="h6" style={{ marginVertical: 10, marginLeft: 8 }}>
                Bebidas disponíveis
              </Text>

              <View
                style={{
                  marginTop: 5,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
              >
                {features?.drink_type_list.map((drink) => (
                  <Tag key={`${drink}-type`} content={drink} isSelected={true} />
                ))}
              </View>
            </View>
          )}

          {!isEmpty(features?.food_type_list) && (
            <View style={{ marginTop: 20 }}>
              <Text category="h6" style={{ marginVertical: 10, marginLeft: 8 }}>
                Comidas servidas
              </Text>

              <View
                style={{
                  marginTop: 5,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
              >
                {features?.food_type_list.map((food) => (
                  <Tag key={`${food}-type`} content={food} isSelected={true} />
                ))}
              </View>
            </View>
          )}

          {!isEmpty(features?.music_style_list) && (
            <View style={{ marginTop: 20 }}>
              <Text category="h6" style={{ marginVertical: 10, marginLeft: 8 }}>
                Tipos de músicas mais tocados
              </Text>

              <View
                style={{
                  marginTop: 5,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
              >
                {features?.music_style_list.map((music) => (
                  <Tag key={`${music}-type`} content={music} isSelected={true} />
                ))}
              </View>
            </View>
          )}
        </View>
      );
    }
  };

  const renderPartyInfo = () => {
    const { street, city, place_number, district } = partyPlace.address;
    const placeAddress = `${street}, ${place_number}. ${district} - ${city}, SP`;

    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Image
            style={{ width: 'auto', height: 200, borderRadius: 20, marginVertical: 20 }}
            source={require('../../assets/img_pub.png')}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 35, height: 35, marginRight: 10 }}
              source={require('../../assets/visits-icon.png')}
            />
            <Text category="s1" style={{ marginRight: 60 }}>
              Numero de visitas <Text>{partyPlace.checkins.length}+</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 35, height: 35, marginRight: 10 }}
              source={require('../../assets/address-icon.png')}
            />
            <Text category="s1" style={{ marginRight: 60 }}>
              {placeAddress}
            </Text>
          </View>
        </View>

        {renderPartyFeatures()}
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView>
        <Layout style={{ flex: 1 }}>
          <TopNavigation
            title={partyPlace.name}
            accessoryLeft={
              <TopNavigationAction
                icon={<Icon name="arrow-back" onPress={navigateSearchParty} />}
              />
            }
          />

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner />
            </View>
          ) : (
            renderPartyInfo()
          )}
        </Layout>
      </ScrollView>

      {!loading && <Checkin partyPlace={partyPlace} onSucess={navigateSearchParty} />}
    </Layout>
  );
}
