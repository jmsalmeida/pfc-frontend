import { useSelector } from 'react-redux';
import { styles } from './styles';
import { Avatar, Layout, Text } from '@ui-kitten/components';
import { isPartyPlace } from '../../util/utils';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function UserProfileHeader({ onClick }) {
  const currentUser = useSelector((state) => state.userSession.currentUser);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(
      isPartyPlace(currentUser?.user_type)
        ? currentUser?.party_place?.main_contact
        : currentUser?.partyer?.name,
    );
  }, [currentUser?.party_place?.main_contact, currentUser?.partyer?.name, currentUser?.user_type]);

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Avatar style={styles.avatar} size="medium" source={require('../../assets/logo.png')} />

      <Layout>
        <Text category="s2">Bem vindo!</Text>
        <Text category="h6">{userName}</Text>
      </Layout>
    </TouchableOpacity>
  );
}
