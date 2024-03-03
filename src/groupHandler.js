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
        if (manageLogins.checkAuth(data.email, data.authCode) ) {
            if(manageLogins.checkEmail(data.email)) {
                res.status(200);
                groupManager.addToGroup(data.event, manageLogins.getUserByEmail(data.email).uid);
                res.end("Success");
            } else {
                res.status(403);
                res.end("Must verify email before registering");
            }
            
        } else {
            res.status(403);
            res.end("Failed to authenticate");
        }
    })
}

export function getGroupMembersHandler(req, res) {
    let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (manageLogins.checkAuth(data.email, data.authCode)) {
            let members = [];
            let groups = groupManager.getGroups();
            console.log(groups)
            let foundUser = false;
            let userId = manageLogins.getUserByEmail(data.email).uid;
            for(let g of groups.groups) {
                console.log(g.event, data.event);
                if(g.event == data.event) {
                    for(let h of g.users) {
                        console.log(h, userId);
                        if(h == userId) {
                            foundUser = true;
                        }
                        members.push(manageLogins.getUserByID(h));
                    }
                    break;
                }
            }
            if(foundUser) {
                res.status(200);
                res.end(JSON.stringify({members: members}));
            } else {
                res.status(403);
                res.end("Not in group")
            }
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
            groupManager.leaveGroup(data.event, manageLogins.getUserByEmail(data.email).uid);
            res.end("Success");
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}