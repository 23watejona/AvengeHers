import group from './objects/group.js';
import groups from './app/app-data/groups.json' assert { type: 'json' };

export function getGroups() {
	return groups;
}

export default {
	getGroups: getGroups
}