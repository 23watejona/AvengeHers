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
			return structuredClone(login);
		}
	}
	return undefined;
}

export function incrementWalk(uid) {
	for(let i = 0; i < publicData.users.length; ++i) {
		if(publicData.users[i].uid == uid) {
			++publicData.users[i].numWalks;
			fs.writeFileSync('src/app/app-data/public-data.json', JSON.stringify(publicData));
			return true;
		}
	}
	return false;
}

export function getUserByEmail(email) {
	for(let login of publicData.users) {
		if(login.email == email) {
			return structuredClone(login);
		}
	}
	return undefined;
}

export function saveEmailAuth(email, code) {
	for(let login of logins.users) {
		if(login.email === email) {
			login.emailAuth = hash(code);
			login.emailExpiry = Math.floor(new Date().getTime() / 1000) + 86400; 
			fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
			return true;
		}
	}
	return false;
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
export function checkEmailAuth(email, authHash) {
	for(let login of logins.users) {
		if(login.email === email && authHash == login.emailAuth && login.emailExpiry >  Math.floor(new Date().getTime() / 1000)) {
			login.confirmedEmail = true;
			fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
			return true;
		}
	}
	return false;
}
export function checkEmail(email) {
	for(let login of logins.users) {
		if(login.email === email) {
			return login.confirmedEmail;
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

export function addLogin(name, email, hashedPassword, uid) {
	logins.users.push(new UserData(name, email, hashedPassword, uid));
	publicData.users.push(new PublicUserData(name, email, uid));
	fs.writeFileSync('src/app/app-data/public-data.json', JSON.stringify(publicData));
	fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
}

export default {
	addLogin: addLogin,
	getUserByID: getUserByID,
	getUserByEmail: getUserByEmail,
	generateAuth: generateAuth,
	reauth: reauth,
	checkAuth: checkAuth,
	logout: logout,
	saveEmailAuth: saveEmailAuth,
	checkEmailAuth: checkEmailAuth,
	checkEmail: checkEmail,
	incrementWalk: incrementWalk
}