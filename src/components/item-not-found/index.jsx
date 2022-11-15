import { Layout, Text } from '@ui-kitten/components';
import { styles } from './styles';

export function NotFound() {
  return (
    <Layout style={styles.container}>
      <Text category="h2" style={styles.centerText}>
        Local não encontrado
      </Text>
      <Text category="p2" style={styles.centerText}>
        Infelizmente não encontramos estabelecimentos com estas caracteristicas no cola aqui
      </Text>
    </Layout>
  );
}
