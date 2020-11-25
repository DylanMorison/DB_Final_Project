import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import defaultPic from '../img/default-pic.png';

firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
});


export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
/* eslint-disable */
export const getUserDoc = async uid => {
	if (!uid) return null;
	try {
		const userDoc = await firestore.collection('users').doc(uid).get();
		return { uid, ...userDoc.data() };
	} catch (error) {
		console.log('Error with firebase getUserDoc :OOOO!!!!', error);
	}
};

export const createUserDoc = async (user, userName, fullName) => {
	const userRef = await firestore.collection('users').doc(`${user.uid}`);
	const snapshot = await userRef.get();
	if (!snapshot.exists) {
		const { uid, email } = user;
		const createdAt = new Date();
		try {
			await userRef.set({
				uid,
				email,
				photoURL: defaultPic,
				createdAt,
				userName: userName,
				fullName: fullName
			});
		} catch (error) {
			console.log(error);
		}
	}
	return getUserDoc(user.uid);
};

export default firebase;

window.firebase = firebase;
