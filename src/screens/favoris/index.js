import React, { useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native'; 
import styled from 'styled-components/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://restcountries.com/v3.1/alpha?codes=';

const Favoris = ({ route }) => {
  const navigation = useNavigation();
  const handleNavigation = (page, params) => {
    navigation.navigate(page, params);
  };

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favoris } = route.params;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const value = await AsyncStorage.getItem('@favorites');
        if (favoris !== null) {
          const codes = JSON.parse(favoris).map((favorite) => favorite.alpha3Code);
          const response = await axios.get(`${BASE_URL}${codes.join(',')}`);
          setFavorites(response.data);
        }
      } catch (e) {
        console.log('Erreur lors de la récupération des favoris', e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item>
      <ItemDiv>
        <ItemTitle>{item.name}, {item.region}</ItemTitle>
        <Image
          style={{width: 100, height: 50}}
          source={{
            uri: item.flags.png,
          }}
        />
        <DetailsButton onPress={() => handleNavigation('Details', { id: item.alpha3Code })}>
          <DetailsButtonText>Details</DetailsButtonText>
        </DetailsButton>
      </ItemDiv>
    </Item>
  )}

  console.log("favoris length ", favoris.length);
  return (
    <Container>
      <Title>Mes favoris</Title>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : favoris[0].length === 0 ? (
        <EmptyText>Aucun pays favori pour le moment.</EmptyText>
      ) : (
        <FlatList data={favoris[0]} renderItem={renderItem} keyExtractor={(item) => item.alpha3Code} />
      )}
      <StyledButton onPress={() => handleNavigation('Countries')}>
        <StyledTextButton>Retour à la liste</StyledTextButton>
      </StyledButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align:center;
`;

const Item = styled.View`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #999;
  text-align: center;
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

const ItemDiv = styled.View`
display: flex;
align-items: center;
justify-content: center;
`;

const DetailsButton = styled.TouchableOpacity`
margin-top: 10px;
padding: 10px;
background-color: black;
border-radius: 5px;
width:30%;
`;

const DetailsButtonText = styled.Text`
font-size: 16px;
color: #fff;
text-align: center;
`;

export default Favoris;
