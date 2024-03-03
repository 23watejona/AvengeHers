import fs from 'fs';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';

export function emailAuthHandler(req, res) {
        let data = qs.parse(req.url.split("emailAuth?")[1]);
        console.log(data)
        data.auth = hash(data.auth);
        if(manageLogins.checkEmailAuth(data.email, data.auth)) {
            res.status(308);
            res.setHeader("Refresh", "0;url=/login.html")
            res.end()
        } else {
            res.status(403);
            res.end("Invalid");
        }
}