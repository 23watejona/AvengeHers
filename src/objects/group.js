import moment from 'moment';

export default class group {

	// Times are stored in epoch time

	constructor(event, start, destination, startTime, duration) {
		this.event = event;
		this.start = start;
		this.destination = destination;
		this.startTime = startTime;
		this.users = [];
	}
}
