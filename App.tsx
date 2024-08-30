import 'react-native-gesture-handler';
import React from 'react';
import Navigation from '@navigation/Navigation';
if (__DEV__) {
  require('./ReactotronConfig');
}
const App = () => {
  return <Navigation />;
};

export default App;
