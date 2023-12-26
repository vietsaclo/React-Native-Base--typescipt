import { io } from 'socket.io-client';
import ENVs from './Env';

// "undefined" means the URL will be computed from the `window.location` object
const URL = ENVs.API_URL;

export const MySocket = io(URL, {
  autoConnect: false,
  forceNew: true,
});
