import { useEffect, useState } from 'react';
import {
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button,
} from '@ui-kitten/components';
import { ActivityIndicator, View, Image } from 'react-native';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';

export function PartyPlaceScreen({ route, navigation }) {
  const { placeId } = route.params;
  const goBack = () => {
    navigation.navigate('SearchParty');
  };

  const [partyPlace, setPartyPlace] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPartyPlace = async () => {
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
          onHide: () => navigation.navigate('SearchParty'),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartyPlace();
  }, []);

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
      return <Text category="s1">Complete features</Text>;
    }
  };

  const renderPartyInfo = () => {
    const { street, city, place_number, district } = partyPlace.address;
    const placeAddress = `${street}, ${place_number}. ${district} - ${city}, SP`;

    return (
      <View style={{ padding: 20 }}>
        <Text category="h4">{partyPlace.name}</Text>
        <Image
          style={{ width: 'auto', height: 200, borderRadius: 20, marginVertical: 20 }}
          source={require('../../assets/img_pub.png')}
        />

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
        {renderPartyFeatures()}
      </View>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        accessoryLeft={<TopNavigationAction icon={<Icon name="arrow-back" onPress={goBack} />} />}
      />

      {loading ? <ActivityIndicator /> : renderPartyInfo()}

      <View
        style={{
          padding: 20,
        }}
      >
        <Button status="primary">Cola Aqui</Button>
      </View>
    </Layout>
  );
}
