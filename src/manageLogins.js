import fs from 'fs';
import logins from './app/app-data/logins.json' assert { type: 'json' };
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

export function addLogin(email, hashedPassword, uid) {
	logins.users.push(new UserData(email, hashedPassword, uid));
	publicData.users.push(new PublicUserData(email, uid));
	fs.writeFileSync('src/app/app-data/public-data.json', JSON.stringify(publicData));
	fs.writeFileSync('src/app/app-data/logins.json', JSON.stringify(logins));
}

export default {
	addLogin: addLogin,
	getUserByID: getUserByID,
	getUserByEmail: getUserByEmail
}