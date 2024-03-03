import moment from 'moment';

export default class group {

	// Times are stored in epoch time

	// Receive time in Date Format
	constructor(event, startLocation, eventLocation, date, startTime, endTime) {
		this.event = event;
		this.startLocation = startLocation;
		this.eventLocation = eventLocation;
		this.startTime = Math.floor(new Date(date + " " + startTime).getTime() / 1000);
		this.endTime = Math.floor(new Date(date + " " + endTime).getTime() / 1000);
		this.users = [];
	}
}
