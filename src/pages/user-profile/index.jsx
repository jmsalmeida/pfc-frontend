import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text,
  Card,
  Divider,
  Button,
  Modal,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { isPartyPlace } from '../../util/utils';
import { useCallback, useState } from 'react';
import { api } from '../../services/api';
import Toast from 'react-native-toast-message';
import { clearCurrentUser, clearUserSession } from '../../reducers/application';

export function UserProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSession.currentUser);
  const [showDestroyUserModal, setShowDestroyUserModal] = useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  const destroyUser = useCallback(async () => {
    try {
      const response = await api.delete('/auth/destroy');
      if (!response.ok) throw response;

      setShowDestroyUserModal(false);
      dispatch(clearUserSession());
      dispatch(clearCurrentUser());

      Toast.show({
        type: 'success',
        text1: 'Usuário excluido!',
        text2: 'Você não poderá mais acessar essa conta. Obrigado por usar nossos serviços',
      });
    } catch (error) {
      const errorMessage = error.body.errors[0];
      Toast.show({
        type: 'error',
        text1: 'Algo errado ao excluir o usuário',
        text2: errorMessage,
      });
    }
  }, [dispatch]);

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Excluir conta permanentemente</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="danger"
        onPress={() => destroyUser()}
      >
        Sim! Excluir minha conta
      </Button>
    </View>
  );

  return (
    console.log({ currentUser }),
    (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="Perfil de usuário"
          accessoryLeft={
            <TopNavigationAction icon={<Icon name="arrow-back" onPress={navigateBack} />} />
          }
        />

        <Layout style={{ paddingHorizontal: 20 }}>
          <Card style={{ margin: 0 }}>
            <View style={{ paddingVertical: 10 }}>
              <Text category="s2">Email</Text>
              <Text category="p1">{currentUser?.email}</Text>
            </View>

            <Divider />

            {isPartyPlace(currentUser?.user_type) ? (
              <View>
                <View style={{ paddingVertical: 10 }}>
                  <Text category="s2">Endereço</Text>
                  <Text category="p1">
                    {currentUser?.party_place?.address?.street}, nº{' '}
                    {currentUser?.party_place?.address?.place_number}
                  </Text>
                </View>

                <View style={{ paddingVertical: 10 }}>
                  <Text category="s2">Cidade</Text>
                  <Text category="p1">{currentUser?.party_place?.address?.city}</Text>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ paddingVertical: 10 }}>
                  <Text category="s2">Nome</Text>
                  <Text category="p1">{currentUser?.partyer.name}</Text>
                </View>

                <View style={{ paddingVertical: 10 }}>
                  <Text category="s2">Genero</Text>
                  <Text category="p1">{currentUser?.partyer.gender}</Text>
                </View>

                <View style={{ paddingVertical: 10 }}>
                  <Text category="s2">Data de nascimento</Text>
                  <Text category="p1">{currentUser?.partyer['birth_date']}</Text>
                </View>
              </View>
            )}

            <View>
              <Text category="s2">Cadastrado desde</Text>
              <Text category="p1">{moment(currentUser?.created_at).format('DD/MM/YYYY')}</Text>
            </View>
          </Card>

          <Button
            onPress={() => setShowDestroyUserModal(true)}
            status="danger"
            style={{ marginVertical: 20 }}
          >
            Excluir Usuário
          </Button>
        </Layout>

        <Modal
          visible={showDestroyUserModal}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setShowDestroyUserModal(false)}
        >
          <Card disabled={true} header={Header} footer={Footer} style={{ marginHorizontal: 20 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text category="p1" style={{ textAlign: 'center' }}>
                Cuidado! Você tem certeza que deseja EXCLUIR a sua conta no Cola Aqui?
              </Text>
            </View>
          </Card>
        </Modal>
      </Layout>
    )
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
