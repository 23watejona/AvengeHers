import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';


export function logoutPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.logout(data.email, data.authCode)) {
            res.status(200);
            res.end("Successful");
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}