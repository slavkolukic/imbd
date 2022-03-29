import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import {persistor, store} from './src/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootStackNavigator />
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
