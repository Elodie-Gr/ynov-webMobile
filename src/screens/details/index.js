import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styled from 'styled-components';

const BASE_URL = 'https://restcountries.com/v2/alpha/';

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}${id}`)
      .then(response => {
        setCountry(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('🚀 ~ file: Details.js:21 ~ useEffect ~ err', err);
      });
  }, [id]);

  const handleNavigation = page => {
    navigation.navigate(page);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <ItemDiv>
      <StyledText>{country.name}</StyledText>
      <StyledImage
        source={{
          uri: country.flags.png,
        }}
      />    
      <StyledTextDescription>Capitale : {country.capital}</StyledTextDescription>
      <StyledTextDescription>Population : {country.population} habitants</StyledTextDescription>
      <StyledTextDescription>Continent : {country.region}</StyledTextDescription>
      <StyledTextDescription>Superficie : {country.area} km2</StyledTextDescription>
      <StyledTextDescription>Langues : {country.languages.map(l => l.name).join(', ')}</StyledTextDescription>
      <StyledTextDescription>Monnaie : {country.currencies.map(c => c.name).join(', ')} {country.currencies.map(c => c.symbol).join(', ')}</StyledTextDescription>
      </ItemDiv>
      <StyledButton onPress={() => handleNavigation('Countries')}>
        <StyledTextButton>Retour à la liste</StyledTextButton>
      </StyledButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #F0F0F0;
  padding: 20px;
`;

const StyledImage = styled.Image`
width: 250px;
height: 150px;
margin-bottom: 10px;
`;

const StyledText = styled.Text`
  color: black;
  font-size:22px;
  padding-bottom: 10px;
  font-weight: bold;
  margin:20px 0px;
`;

const StyledTextDescription = styled.Text`
  color: black;
  font-size:18px;
  margin-top:5px;
  text-align: left;
`;

const ItemDiv = styled.View`
display: flex;
align-items: center;
justify-content: center;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: black;
  padding: 10px;
  border-radius: 5px;
  width:50%;
  margin-left: 90px;
  margin-top: 50px;
`;

const StyledTextButton = styled.Text`
color: white;
font-size:18px;
text-align:center;
`; 

export default Details;
