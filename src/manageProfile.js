import manageLogins from './manageLogins.js';

export function getStats(email) {
	return manageLogins.getUserByEmail(email);
}

export default {
	getStats: getStats
}
