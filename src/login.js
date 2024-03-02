import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';

function authenticate(email, passwordHash) {
	return manageLogins.generateAuth(email, passwordHash)
}

export function loginPageHandler(req, res) {
	let data = '';
	req.on('data', (d)=>{
		data += d.toString();
	})
	req.on('end', ()=>{
		data = qs.parse(data);
		data.password = hash(data.password);
		try{
			let authCode = authenticate(data.email, data.password);
			if(authCode != undefined) {
				res.status(200);
				res.end(authCode);
			} else {
				res.status(503);
				res.end("Invalid");
			}
		} catch (e) {
			res.status(503);
			console.log(e.message)
			res.end(e.message);
			return;
		}
	})
}