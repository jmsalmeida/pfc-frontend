import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export const NotFound = () => {
  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.centerText}>Local não encontrado</Text>
      <Text category='p2' style={styles.centerText}>Este estabelecimento não está cadastrado em nossa plataforma</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  centerText: { textAlign: 'center' },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
})