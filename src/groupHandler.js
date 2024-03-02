import groupManager from './manageGroups.js';
export function groupPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (checkAuth(data.email, data.authCode)) {
            res.status(200);
            let groups = groupManager.getGroups();
            res.end(JSON.stringify(groups));
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}

export function createGroupPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (checkAuth(data.email, data.authCode)) {
            res.status(200);
            /*
                ADD GROUP USING GROUP MANAGER
            */
            let groups = groupManager.getGroups();
            res.end(JSON.stringify(groups));
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}