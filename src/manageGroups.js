import group from './objects/group.js';
import groups from './app/app-data/groups.json' assert { type: 'json' };
import fs from 'fs'

export function getGroups() {
	return groups;
}

export function addToGroup(eventname, userid) {
	for(let g of groups.groups) {
		if(g.event == eventname) {
			if(g.users == undefined) {
				g.users = [];
			}
			g.users.push(userid);
			fs.writeFileSync('src/app/app-data/groups.json', JSON.stringify(groups));
			return true;
		}
	}
	return false;
}

export default {
	getGroups: getGroups,
	addToGroup: addToGroup
}