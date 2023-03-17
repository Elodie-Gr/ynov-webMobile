import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/base';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import LogoMonde from '../../images/carteMonde.jpg';

const LoginForm = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    username: '',
    password: '',
  });

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.username,
        password: inputs.password,
      },
    })
      .then(res => {
        console.log(res.headers['x-access-token']);
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            navigation.navigate('Countries');
          })
          .catch(err => {
            console.log('🚀 ~ file: index.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        console.log('🚀 ~ file: index.js:6 ~ Login ~ err', err);
      });
  };

  return (
    <Container>
      <StyledTextBienvenue>Bienvenue sur CountryProject ! </StyledTextBienvenue>
      <ImageStyled
          source={LogoMonde}
        />
      <InputContainer>
        <TextInputStyled
          placeholder="Nom d'utilisateur"
          placeholderTextColor="black"
          value={inputs.username}
          onChangeText={text => setInputs({...inputs, username: text})}
        />
      </InputContainer>
      <InputContainer>
        <TextInputStyled
          placeholder="Mot de passe"
          placeholderTextColor="black"
          value={inputs.password}
          onChangeText={text => setInputs({...inputs, password: text})}
          secureTextEntry
        />
      </InputContainer>
      <Touchable onPress={handleLogin}>
        <StyledText>Se connecter</StyledText>
      </Touchable>
    </Container>
  );
};

const InputContainer = styled.View`
    border-width: 1px;
    border-color: black;
    border-radius: 10px;
    margin: 10px;
    width: 90%;
`;

const ImageStyled = styled.Image`
    width: 90%;
    height: 30%;
    margin: 20px;
`;

const TextInputStyled = styled.TextInput`
  padding: 12px;
  color: black;
`;

const Touchable = styled.TouchableOpacity`
    background-color: #3CB371;
    border-width: 1px;
    border-color: black;
    border-radius: 10px;
    margin: 10px 100px;
`;

const StyledText = styled.Text`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
`;

const StyledTextBienvenue = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const Container = styled.View`
  flex: 1;
`;

export default LoginForm;