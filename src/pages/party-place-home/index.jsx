import { Card, Layout, Text, TopNavigation } from '@ui-kitten/components';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { LogoutAction } from '../../components/logout-action';
import { styles as partyPlaceCardStyles } from '../../components/party-place-card/styles';
import { UserProfileHeader } from '../../components/user-profile-header';
import { api } from '../../services/api';
import { styles } from './styles';

export function PartyPlaceHomeScreen({ navigation }) {
  const currentUser = useSelector((state) => state.userSession.currentUser);
  const [partyPlace, setPartyPlace] = useState({});

  const checkinsToday = () => {
    let checkinsToday = 0;
    let today = new Date();
    partyPlace.checkins.forEach((checkin) => {
      if (moment(checkin.created_at).isSame(today, 'day')) {
        checkinsToday += 1;
      }
    });
    return checkinsToday;
  };

  const checkinsYesterday = () => {
    let checkinsYesterday = 0;
    let yesterday = moment().subtract(1, 'day');
    partyPlace.checkins.forEach((checkin) => {
      if (moment(checkin.created_at).isSame(yesterday, 'day')) {
        checkinsYesterday += 1;
      }
    });
    return checkinsYesterday;
  };

  const getPartyPlace = useCallback(async () => {
    const url = `party-places/${currentUser?.party_place.id}`;

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
        });
      }
    }
  }, [currentUser?.party_place?.id]);

  useEffect(() => {
    getPartyPlace();
  }, [getPartyPlace]);

  const Header = (props) => (
    <View {...props}>
      <Layout style={styles.formCenterTitle}>
        <Text style={styles.formHeaderText} category="h6">
          {partyPlace.name}
        </Text>
      </Layout>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Layout style={styles.formCenterTitle}>
        <Text category="h6" style={styles.formBottomTitle}>
          Número de check-in
        </Text>
      </Layout>
      <Text category="p1" style={styles.formBottomText}>
        Dia anterior: {checkinsYesterday()}
      </Text>
      <Text category="p1" style={styles.formBottomText}>
        Numero de visitas hoje:
        <Text category="s1"> {checkinsToday()} +</Text>
      </Text>
    </View>
  );

  const goToProfile = () => {
    navigation.navigate('UserProfile');
  };

  const _renderUserProfileHeader = <UserProfileHeader onClick={goToProfile} />;

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
      <TopNavigation accessoryLeft={_renderUserProfileHeader} accessoryRight={LogoutAction} />

      <Layout style={styles.formCenterTitle}>
        <Text category="h5" style={styles.formTitle}>
          Perfil do estabelecimento
        </Text>
      </Layout>

      {Object.keys(partyPlace).length > 0 && (
        <Card style={partyPlaceCardStyles.card} header={Header} footer={Footer}>
          <Text style={styles.formMiddleText}>
            Contato principal: <Text category="s1">{partyPlace.main_contact}</Text>
          </Text>

          <Text style={styles.formMiddleText}>
            CNPJ: <Text category="s1">{partyPlace.cnpj}</Text>
          </Text>

          <Text style={styles.formMiddleText}>
            Celular para contato: <Text category="s1">{partyPlace.cellphone}</Text>
          </Text>

          <Text style={styles.formMiddleText}>
            Endereço cadastrado:
            <Text category="s1">
              {partyPlace?.address?.street}, {partyPlace?.address?.place_number}
            </Text>
          </Text>
        </Card>
      )}
    </Layout>
  );
}
