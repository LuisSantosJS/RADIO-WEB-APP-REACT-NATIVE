
import { registerRootComponent } from 'expo';
import App from './src/Router';
import TrackPlayer from 'react-native-track-player';
registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => require('./src/services/TrackPlayer.ts'));