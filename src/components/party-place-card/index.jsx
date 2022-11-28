import { Icon, Layout, Text } from '@ui-kitten/components';
import { styles } from './styles';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import { PARTY_PLACE_IMAGE_PATHS } from '../../constants';

export function PartyPlaceCard({ partyPlace, navigation, imageIndex }) {
  const placeImage = PARTY_PLACE_IMAGE_PATHS[imageIndex];

  const navigatePartyPlace = () => {
    navigation.navigate('PartyPlace', { placeId: partyPlace.id, placeImage });
  };

  const { street, city, place_number, district } = partyPlace.address;
  const placeAddress = `${street}, ${place_number}. ${district} - ${city}, SP`;

  function Footer(props) {
    return (
      <TouchableOpacity {...props} style={styles.card.footer} onPress={navigatePartyPlace}>
        <View style={{ width: '85%' }}>
          <Text category="h5">{partyPlace.name}</Text>
          <Text category="p2">{placeAddress}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            fill="#8F9BB3"
            name="arrow-forward-outline"
            onPress={navigatePartyPlace}
            style={{ width: 18, height: 18 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function Header(props) {
    return (
      <View {...props}>
        <ImageBackground
          resizeMode="cover"
          source={placeImage}
          style={{ flex: 1, height: 250 }}
          imageStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        ></ImageBackground>
      </View>
    );
  }

  return (
    <Layout style={styles.card}>
      <Header />
      <Footer />
    </Layout>
  );
}
