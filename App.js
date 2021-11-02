import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';;
import {ReservaStackNavigator} from './src/pages/components/navigation/StackNavigator';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import TabNavigator from './src/pages/components/navigation/TabNavigator';
import colors from './src/pages/res/colors';
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      accent: colors.accent,
    },
  };
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
          <TabNavigator /> 
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
