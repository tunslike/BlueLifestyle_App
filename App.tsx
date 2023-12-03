import 'react-native-gesture-handler';
import * as React from 'react';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from './src/context/AuthContext';
import Router from './src/views/navigation/Router';

// create app
const App = () => {
  return (
    <Provider store={store}>
<GestureHandlerRootView style={{ flex: 1}}>
    <AuthProvider>  
      <Router />
    </AuthProvider>
</GestureHandlerRootView>
</Provider>
  );
}

export default App;