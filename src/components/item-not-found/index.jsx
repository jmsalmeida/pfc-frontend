import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { styles } from './styles';

export function NotFound() {
  return (
    <Layout style={styles.container}>
      <Text category="h2" style={styles.centerText}>
        Local não encontrado
      </Text>
      <Text category="p2" style={styles.centerText}>
        Este estabelecimento não está cadastrado em nossa plataforma
      </Text>
    </Layout>
  );
}
