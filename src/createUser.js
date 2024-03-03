import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';
import sendMail from './sendEmail.js';

function createUser(name, email, hashedPassword) {
	let uid = generateRandomString(16);
	if(manageLogins.getUserByEmail(email) != undefined) {
		throw new Error("Email exists");
	}
	while(manageLogins.getUserByID(uid) != undefined) {
		uid = generateRandomString(16);
	}
	manageLogins.addLogin(name, email, hashedPassword, uid);
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
			try {
                let code = generateRandomString(25);
                manageLogins.saveEmailAuth(data.email, code);
                sendMail(data.email, 'Verify Your Email', `http://localhost:3000/emailAuth?auth=${code}&email=${data.email}`);
            } catch (e) {
                console.log(e.message);
            }
		} catch (e) {
			res.end(e.message);
			return;
		}
		res.end("Success");
	})
}