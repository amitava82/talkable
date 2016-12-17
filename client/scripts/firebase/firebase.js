import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const fireApp = firebase.initializeApp(FIREBASE_CONFIG);
export const fireAuth = fireApp.auth();
export const fireDb = fireApp.database();

export default {
    fireDb,
    fireAuth,
    fireApp
}