import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {ThemeProvider} from './src/context/ThemeContext';
import Home from './src/screens/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      retry: 0,
    },
  },
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C4AB6',
    accent: '#8D9EFF',
  },
};

const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <StatusBar
        animated
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <PaperProvider theme={theme}>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
