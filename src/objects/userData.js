export default class userData {

	constructor(email, hashedPassword) {
		this.email = email;
		this.#hashedPassword = hashedPassword;
		this.rating = 0;
		this.numWalks = 0;
	}
	checkPassword(hashedPassword) {
		if(hashedPassword == this.#hashedPassword) {
			return true;
		}
		return false;
	}
}