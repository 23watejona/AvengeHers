export default class userData {

	constructor(name, email, hashedPassword, userId) {
		this.name = name;
		this.email = email;
		this.hashedPassword = hashedPassword;
		this.confirmedEmail = false;
		this.authHash = 0;
		this.expiry = 0;
		this.userId = userId;
	}
}