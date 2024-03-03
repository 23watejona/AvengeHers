import manageProfile from './manageProfile.js';
import manageLogins from './manageLogins.js';
import qs from 'qs';
import hash from './hash.js';

export function profileHandler(req, res) {
	let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            res.status(200);
            let stats = manageProfile.getStats(data.email);
            res.end(JSON.stringify(stats));
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}