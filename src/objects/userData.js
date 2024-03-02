export default class userData {

	constructor(email, hashedPassword, userId) {
		this.email = email;
		this.hashedPassword = hashedPassword;
		this.confirmedEmail = false;
		this.authHash = 0;
		this.expiry = 0;
		this.userId = userId;
	}
}