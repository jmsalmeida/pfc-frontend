import store from './src/store';
import { Provider } from 'react-redux';

// Toast messages
import Toast from 'react-native-toast-message';

// UI
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Navigation
import { AppNavigator } from './src/navigators/navigation';

// Query
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { default as mapping } from './src/config/theme/mapping.json';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
  });
});

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
          <AppNavigator />
        </ApplicationProvider>

        <Toast />
      </QueryClientProvider>
    </Provider>
  );
}
