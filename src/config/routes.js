import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import styled from 'styled-components';
import CountriesPage from '../screens/countries';
import LoginPage from '../screens/login';
import CountryDetails from '../screens/details';
import FavoriteCountries from '../screens/favoris';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <GlobalSafeArea>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Countries" component={CountriesPage} />
          <Stack.Screen name="Details" component={CountryDetails} />
          <Stack.Screen name="Favoris" component={FavoriteCountries} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

export default Routes;