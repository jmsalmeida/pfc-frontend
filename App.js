import React from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, Layout, Text, CheckBox } from '@ui-kitten/components';

export default function App() {
  const [checked, setChecked] = React.useState(false);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <Text category='h1'>HOME</Text>
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
