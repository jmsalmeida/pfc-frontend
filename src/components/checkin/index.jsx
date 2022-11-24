import { StyleSheet, View } from 'react-native';
import { Button, Modal, Card, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';

export function Checkin({ partyPlace, onSucess }) {
  const [visible, setVisible] = useState(false);

  const { street, city, place_number, district } = partyPlace.address;
  const placeAddress = `${street}, ${place_number}. ${district} - ${city}, SP`;

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Confirmar check-in</Text>
    </View>
  );

  const visitPlace = async (placeId) => {
    try {
      const response = await api.post(`/checkin/visit-party?party_place_id=${placeId}`);

      if (!response.ok) throw response;

      Toast.show({
        type: 'success',
        text1: 'Obrigado por marcar a sua presença',
      });

      setVisible(false);
      onSucess();
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    }
  };

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="small" onPress={() => visitPlace(partyPlace.id)}>
        Checkin
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button onPress={() => setVisible(true)}>Cola Aqui</Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} header={Header} footer={Footer}>
          <View style={{ flex: 1, alignItems: 'center', textAlign: 'center' }}>
            <Text>
              Legal, bora visitar o rolê &quot;<Text category="label">{partyPlace.name}</Text>
              &quot;!
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Para concluir o checkin você só precisa confirmar o nome e endereço do local que irá
              visitar.
            </Text>
            <View
              style={{ marginVertical: 20, textAlign: 'center', flex: 1, alignItems: 'center' }}
            >
              <Text category="h6">{partyPlace.name}</Text>
              <Text category="s1">{placeAddress}</Text>
            </View>
          </View>
        </Card>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
