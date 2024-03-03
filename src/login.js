import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';
import sendMail from './sendEmail.js';

function authenticate(email, passwordHash) {
    return manageLogins.generateAuth(email, passwordHash)
}

export function loginPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.password = hash(data.password);
        let authCode = authenticate(data.email, data.password);
        if (authCode != undefined) {
            res.status(200);
            res.end(authCode);
            try {
                let code = generateRandomString(25);
                manageLogins.saveEmailAuth(data.email, code);
                sendMail(data.email, 'Verify Your Email', `http://localhost:3000/emailAuth?auth=${code}&email=${data.email}`);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}