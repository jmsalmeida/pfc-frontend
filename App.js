import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/Navigators/navigation.component';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>

      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator/>
      </ApplicationProvider>
    </>
  );
}