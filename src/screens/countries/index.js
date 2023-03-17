import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import styled from 'styled-components';

const BASE_URL = 'https://restcountries.com/v2/all';



const Countries = props => {
 
  const [page, setPage] = React.useState(0);
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const CountryRow = ({item}) => {
    const isFavorite = favorites.some(country => country.alpha3Code === item.alpha3Code);
    const toggleFavorite = () => {
      const index = favorites.findIndex(country => country.alpha3Code === item.alpha3Code);
      if (index === -1) {
        setFavorites([...favorites, item]);
      } else {
        const newFavorites = [...favorites];
        newFavorites.splice(index, 1);
        setFavorites(newFavorites);
      }
    };
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
          <AlignButton>
          <DetailsButton onPress={() => handleNavigation('Details', { id: item.alpha3Code })}>
            <DetailsButtonText>Details</DetailsButtonText>
          </DetailsButton>
          <StyledButtonFavoris onPress={toggleFavorite}>
            {isFavorite ? (
              <StyledTextButton>Retirer favoris</StyledTextButton>
            ) : (
              <StyledTextButton>Ajouter favoris</StyledTextButton>
            )}
          </StyledButtonFavoris>
          </AlignButton>
        </ItemDiv>
      </Item>
    );
  
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Le pays a été ajouté aux favoris avec succès');
    } catch (error) {
      console.log('Erreur de sauvegarde de favoris', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      const favoritesArray = JSON.parse(favoritesJson);
      if (favoritesArray) {
        setFavorites(favoritesArray);
      }
    } catch (error) {
      console.log('Error loading favorites: ', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);


  useFocusEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log('🚀 ~ file: Countries.js:6 ~ countries ~ err', err);
      });
  });

  useEffect(() => {
    getCountries();
  }, [page]);

  const getCountries = () => {
    setLoading(true);
    setError(false);

    axios
      .get(`${BASE_URL}`, {
        params: {
          limit: 20
        },
      })
      .then(response => {
        //console.log('🚀 ~ file: Countries.js:6 ~ Countries ~ response', response);
        setCountries(prevCountries => [...prevCountries, ...response.data]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      })
      .catch(err => {
        console.log('🚀 ~ file: Countries.js:6 ~ Countries ~ err', err);
        setError(true);
        setLoading(false);
      });
  };

  const handleNavigation = (page, params) => {
    props.navigation.navigate(page, params);
  };

  const renderFooter = () => {
    if (loading) {
      return <LoadingIndicator />;
    } else if (error) {
      return <ErrorMessage>Échec du chargement des données. L'API est inaccessible. </ErrorMessage>;
    } else {
      return null;
    }
  };

  return (
    <Container>
      <StyledText>Pays</StyledText>
      <FlatList
        data={countries}
        onEndReached={() => {
          console.log('fin');
          setPage(page + 1);
        }}
        renderItem={CountryRow}
        keyExtractor={(item )=> item.alpha3Code}
        ListFooterComponent={renderFooter}
      />
 {/*<StyledButton onPress={() => handleNavigation('Login')}>
        <StyledTextButton>Connexion</StyledTextButton>
      </StyledButton>*/}
      <StyledButtonFavorisList onPress={() => handleNavigation('Favoris', {favoris: [favorites]})}>
        <StyledTextButton>Favoris</StyledTextButton>
      </StyledButtonFavorisList>
    </Container>
  );
};

const StyledButtonFavoris = styled.TouchableOpacity`
  background-color: orange;
  padding: 10px;
  border-radius: 5px;
  width:50%;
  margin-top: 10px;
  margin-left: 20px;
`;

const StyledButtonFavorisList = styled.TouchableOpacity`
  background-color: orange;
  padding: 10px;
  border-radius: 5px;
  width:50%;
  margin-top: 10px;
  margin-left: 90px;
`;

const StyledTextButton = styled.Text`
color: white;
font-size:16px;
text-align:center;
`; 

const StyledText = styled.Text`
  color: black;
  font-size:18px;
  text-align:center;
  padding-bottom: 10px;
  font-weight: bold;
`;

const ErrorMessage = styled.Text`
  color: red;
  font-size:18px;
  text-align:center;
  padding-bottom: 10px;
  font-weight: bold;
  margin-top: 50px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const AlignButton = styled.View`
width: 90%;
display: flex;
flex-direction: row;
justify-content: center;
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
  margin-bottom:10px;
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

const LoadingIndicator = styled.ActivityIndicator`
  margin: 20px;
`;


export default Countries;