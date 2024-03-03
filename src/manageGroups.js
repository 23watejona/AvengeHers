import group from './objects/group.js';
import groups from './app/app-data/groups.json' assert { type: 'json' };
import fs from '@cyclic.sh/s3fs/promises'

export function getGroups() {
	return groups;
}

export function createGroup(eventName, startLocation, eventLocation, date, startTime, endTime) {
	for(let g of groups.groups) {
		if(g.event == eventName) {
			return false;
		}
	}
	groups.groups.push(new group(eventName, startLocation, eventLocation, date, startTime, endTime));
	fs.writeFileSync('src/app/app-data/groups.json', JSON.stringify(groups));
	return true;
}

export function addToGroup(eventname, userid) {
	for(let g of groups.groups) {
		if(g.event == eventname) {
			if(g.users == undefined) {
				g.users = [];
			}
			for(let h of g.users) {
				if(h == userid) {
					return false;
				}
			}
			g.users.push(userid);
			fs.writeFileSync('src/app/app-data/groups.json', JSON.stringify(groups));
			return true;
		}
	}
	return false;
}
export function leaveGroup(eventname, userid) {
	for(let g of groups.groups) {
		if(g.event == eventname) {
			let r = []
			for(let u of g.users) {
				if(u != userid) {
					r.push(userid);
				}
			}
			g.users = r;
			fs.writeFileSync('src/app/app-data/groups.json', JSON.stringify(groups));
			return true;
		}
	}
	return false;
}
export default {
	getGroups: getGroups,
	addToGroup: addToGroup,
	createGroup: createGroup,
	leaveGroup: leaveGroup
}