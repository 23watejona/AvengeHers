export default class userData {

	constructor(email, hashedPassword, userId) {
		this.email = email;
		this.#hashedPassword = hashedPassword;
		this.rating = 0;
		this.numWalks = 0;
		this.confirmedEmail = false;
		this.#authHash = 0;
		this.expiry = 0;
		this.userId = userId;
	}
	checkPassword(hashedPassword) {
		if(hashedPassword == this.#hashedPassword) {
			return true;
		}
		return false;
	}
}