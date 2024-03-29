import React from 'react';
import { View, StyleSheet } from 'react-native';
import EventForm from './eventForm';

const App = () => {
  return (
    <View style={styles.container}>
      <EventForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;