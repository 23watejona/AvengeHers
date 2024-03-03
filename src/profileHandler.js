import manageLogins from './manageLogins.js';
import qs from 'qs';
import hash from './hash.js';
import groupManager from './manageGroups.js';

export function profileHandler(req, res) {
	let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);

        let events = [];
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            if (data.switch == "1") {
                let userData = manageLogins.getUserByEmail(data.email);
                let groups = groupManager.getGroups();
                for (let g of groups.groups) {
                    if (g.users == undefined) {
                        continue;
                    }
                    if (g.users.includes(userData.uid)) {
                        events.push(g);
                    }
                }
                res.status(200);
                res.end(JSON.stringify(events));
            } else {
                res.status(200);
                let stats = manageLogins.getUserByEmail(data.email);
                res.end(JSON.stringify(stats));
            }
        } else {
            res.status(403);
            res.end("Invalid");
        }
        
    })
}