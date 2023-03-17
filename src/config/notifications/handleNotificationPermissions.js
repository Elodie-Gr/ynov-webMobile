import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {showMessage} from 'react-native-flash-message'; // Installer et configurer ce paquet pour pouvoir afficher un message d'erreur propre
import {Linking} from 'react-native';

const handleNotificationPermissions = async () => {
  const settings = await notifee.requestPermission(); // Permet de requeter la permission sur IOS

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    showMessage({
      message: "L'application n'est pas autorisée à envoyer des notifications",
      description:"Appuyez ici pour accéder aux paramètres du téléphone et activez les notifications",
      type: 'danger',
      icon: 'auto',
      duration: 11000,
      onPress: () => Linking.openSettings(), // Permet d'envoyer l'utilisateur vers les parametres de l'application dans le telephone
    });
  } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log('User granted permissions request');
  } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
    console.log('User provisionally granted permissions request');
  }
};

export default handleNotificationPermissions;