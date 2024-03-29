import React from 'react';
import { SafeAreaView } from 'react-native';
import NavigationApp from './src/Navigations/Navigations';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationApp />
    </SafeAreaView>
  );
};

export default App;
