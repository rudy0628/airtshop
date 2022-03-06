import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAJDhxbyIDjxD0RybAuhDrqqHiEuqVYQkM',
	authDomain: 'airtshop.firebaseapp.com',
	databaseURL: 'https://airtshop-default-rtdb.firebaseio.com',
	projectId: 'airtshop',
	storageBucket: 'airtshop.appspot.com',
	messagingSenderId: '942133129755',
	appId: '1:942133129755:web:812eb39993fb743acfbebe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
