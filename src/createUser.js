import fs from 'fs';
import qs from 'querystring';
import users from 'src/app/app-data/users.json';
import { createHash } from 'crypto';

function createUser(email, hashedPassword) {

	for(user of users.users) {
		if(user.email == email) {
			throw new Exception("");
		}
	}
	users.users.push(new );
}
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

export function createPageServe(req, res) {
	res.end(fs.readFileSync('src/app/create.html'))
}
export function createPageHandler(req, res) {
	let data = '';
	req.on('data', (d)=>{
		data += d.toString();
	})
	req.on('end', ()=>{
		let data = qs.parse(data);
		data.password = hash(password);
		res.end("Success");
	})
}