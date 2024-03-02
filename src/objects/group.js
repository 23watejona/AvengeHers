import moment from 'moment';

export default class group {

	// Times are stored in epoch time

	// Receive time in Date Format
	constructor(event, start, destination, startTime, duration) {
		this.event = event;
		this.start = start;
		this.destination = destination;
		this.startTime = startTime;
		this.users = [];
	}

	appendUser(userid) {
		this.users.push(userid);
	}

	removeUser(userid) {
		let index = users.indexOF(userid);
		if (index != 1) {
			users.splice(index, 1);
		}
	}

	// Returns in epoch time
	getStartTime() {
		return this.startTime;
	}

	// Close walk, returns true if done, false if not done
	endWalk() {
		let now = moment();
		let startTime = Date.parse(this.startTime);
		if (now > startTime) {
			return true;
		}
		return false;
	}
}

function getDate() {
	var now = moment();
	var startTime = Date.parse(now);
	var ms = Math.floor(new Date(now).getTime());
	console.log(startTime);
}

getDate();