import fs from 'fs';
import logins from './app/app-data/logins.json' assert { type: 'json' };
import hash from './hash.js';
import generateRandomString from './randomString.js';
import publicData from './app/app-data/public-data.json' assert { type: 'json' };
import UserData from './objects/userData.js';
import PublicUserData from './objects/publicUserData.js';

export function getUserByID(uid) {
	for(let login of publicData.users) {
		if(login.uid == uid) {
			return login;
		}
	}
	return undefined;
}

export function getUserByEmail(email) {
	for(let login of publicData.users) {
		if(login.email == email) {
			return login;
		}
	}
	return undefined;
}


export function generateAuth(email, hashedPassword) {
	for(let login of logins.users) {
		if(login.email === email && hashedPassword == login.hashedPassword) {
			let authCode = generateRandomString(25);
			login.authHash = hash(authCode);
			login.expiry = Math.floor(new Date().getTime() / 1000) + 7200; 
			fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
			return authCode;
		}
	}
	return undefined;
}

export function reauth(email, authHash) {
	for(let login of logins.users) {
		if(login.email === email && authHash === login.authHash && login.expiry >  Math.floor(new Date().getTime() / 1000)) {
			let authCode = generateRandomString(25);
			login.authHash = hash(authCode);
			login.expiry = Math.floor(new Date().getTime() / 1000) + 7200; 
			fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
			return authCode;
		}
	}
	return undefined;
}
export function logout(email, authHash) {
	for(let login of logins.users) {
		if(login.email === email && authHash === login.authHash) {
			login.authHash = "";
			login.expiry = 0; 
			fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
			return true;
		}
	}
	return false;
}

export function checkAuth(email, authHash) {
	for(let login of logins.users) {
		if(login.email === email && authHash == login.authHash && login.expiry >  Math.floor(new Date().getTime() / 1000)) {
			return true;
		}
	}
	return false;
}

export function addLogin(email, hashedPassword, uid) {
	logins.users.push(new UserData(email, hashedPassword, uid));
	publicData.users.push(new PublicUserData(email, uid));
	fs.writeFileSync('src/app/app-data/public-data.json', JSON.stringify(publicData));
	fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
}

export default {
	addLogin: addLogin,
	getUserByID: getUserByID,
	getUserByEmail: getUserByEmail,
	generateAuth: generateAuth,
	reauth: reauth,
	checkAuth: checkAuth
}