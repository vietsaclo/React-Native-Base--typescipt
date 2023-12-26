import { WEB_RCT_ACTION } from "../../../common/@core/Consts";
// import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';
import { MediaStream } from "react-native-webrtc";
import Env from "../../../common/@core/Env";
import { MySocket } from "../../../common/@core/MySocket";
import { dispatchOrigin } from "../../../common/@core/Store";
import { ActionTypes } from "../../../common/@core/ActionTypes";

MySocket.connect();

MySocket.on('connection', () => {
  console.log('Socket: client connected');

})

const peerServer = new Peer(undefined, {
  host: Env.API_IP,
  secure: false,
  port: 4100,
  path: '/myPeer',
});

peerServer.on('error', (error: any) => {
  console.log('error', error);
});

peerServer.on('open', (userId: any) => {
  console.log('peer connected with userId: ', userId);

})

export const joinRoom = (stream: MediaStream) => {
  const roomId = '123asfasdfasf332ds';
  dispatchOrigin({ type: ActionTypes.WEB_RTC.UPDATE_MY_STREAM, payload: stream });

  // peerServer.on('open', (userId: any) => {
  //   console.log('peer connected');

  //   MySocket.emit('join-room', { userId, roomId });
  // });

  // MySocket.on('user-connected', (args) => {
  //   console.log('client connected with id: ', args.userId);
  // });
  MySocket.emit('join-room', { userId: 123, room: roomId })
};

export const connectToNewUser = () => {

};
