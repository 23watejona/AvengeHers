import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';

function createUser(name, email, hashedPassword) {
	let uid = generateRandomString(16);
	console.log("got here");
	if(manageLogins.getUserByEmail(email) != undefined) {
		throw new Error("Email exists");
	}
	while(manageLogins.getUserByEmail(email) != undefined) {
		uid = generateRandomString(16);
		manageLogins.addLogin(email, hashedPassword, uid);
	}
<<<<<<< Updated upstream
	manageLogins.addLogin(name, email, hashedPassword, uid);
=======
	
>>>>>>> Stashed changes
}

export function createPageHandler(req, res) {
	let data = '';
	req.on('data', (d)=>{
		data += d.toString();
	})
	req.on('end', ()=>{
		data = qs.parse(data);
		data.password = hash(data.password);
		try{
			createUser(data.name, data.email, data.password);
		} catch (e) {
			res.end(e.message);
			return;
		}
		res.end("Success");
	})
}