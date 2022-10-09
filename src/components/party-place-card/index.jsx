import { Icon, Layout, Text } from '@ui-kitten/components';
import { styles } from './styles';
import { ImageBackground, View } from 'react-native';

export function PartyPlaceCard({ partyPlace, navigation }) {
  const navigatePartyPlace = () => {
    navigation.navigate('PartyPlace', { placeId: partyPlace.id });
  };

  const { street, city, place_number, district } = partyPlace.address;
  const placeAddress = `${street}, ${place_number}. ${district} - ${city}, SP`;

  function Footer(props) {
    return (
      <View {...props} style={styles.card.footer}>
        <View style={{ flex: 4 }}>
          <Text category="h5">{partyPlace.name}</Text>
          <Text category="p2">{placeAddress}</Text>
        </View>

        <Icon
          fill="#8F9BB3"
          name="arrow-forward-outline"
          onPress={navigatePartyPlace}
          style={{ flex: 1, justifyContent: 'flex-end', width: 18 }}
        />
      </View>
    );
  }

  function Header(props) {
    return (
      <View {...props}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/img_pub.png')}
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
