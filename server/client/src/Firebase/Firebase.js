import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import defaultPic from '../img/default-pic.png';

firebase.initializeApp({
	apiKey: 'AIzaSyCw9btAZc0da-RYSItVmxbRWqdjYbIwPqw',
	authDomain: 'dvation-5bea9.firebaseapp.com',
	databaseURL: 'https://dvation-5bea9.firebaseio.com',
	projectId: 'dvation-5bea9',
	storageBucket: 'dvation-5bea9.appspot.com',
	messagingSenderId: '831997251983',
	appId: '1:831997251983:web:3980898e1963e9d5ccfbfa',
	measurementId: 'G-P81PY3Q8DY'
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
