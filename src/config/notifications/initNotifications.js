import {Platform} from 'react-native';
import checkOptimizationAndroid from './checkOptimizationAndroid';
import createAndroidChannels from './createAndroidChannels';
import handleNotificationPermissions from './handleNotificationPermissions';
import handleForegroundNotifications from './handleForegroundNotifications';
// Note that an async function or a function that returns a Promise
// is required for both subscribers.

const initNotifications = async () => {
  handleNotificationPermissions();
  handleForegroundNotifications();
  if (Platform.OS === 'android') {
    checkOptimizationAndroid();
    createAndroidChannels();
  }
};

export default initNotifications;