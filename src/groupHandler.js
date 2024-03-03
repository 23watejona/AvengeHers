import groupManager from './manageGroups.js';
import qs from 'querystring';
import manageLogins from './manageLogins.js';
import hash from './hash.js';
import generateRandomString from './randomString.js';

export function groupPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            res.status(200);
            let groups = groupManager.getGroups();
            res.end(JSON.stringify(groups));
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}

export function eventInfoHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            res.status(200);
            let groups = groupManager.getGroups();
            for(let group of groups.groups) {
                if(group.event == data.event) {
                    res.end(JSON.stringify(group));
                    return;
                }
            }
            res.end(JSON.stringify({}));
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
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            if(groupManager.createGroup(data.eventName, data.startLocation, data.eventLocation, data.date, data.startTime, data.endTime)) {
                res.status(200);
                res.end("Success");
            } else {
                res.status(400);
                res.end("Event exists");
            }
            
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}

export function registerForGroupPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            res.status(200);
            groupManager.addToGroup(data.event, manageLogins.getUserByEmail(data.email).uid);
            res.end("Success");
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}
export function leaveGroupPageHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            res.status(200);
            groupManager.leaveGroup(data.event, manageLogins.getUserByEmail(data.email));
            res.end("Success");
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}