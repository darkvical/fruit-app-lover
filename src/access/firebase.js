import firebase from '../../node_modules/firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { config } from './config-firebase.js';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
