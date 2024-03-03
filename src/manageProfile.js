import manageLogins from 'manageLogins';

export default function getStats(email) {
	return manageLogins.getUserByEmail(email);
}
