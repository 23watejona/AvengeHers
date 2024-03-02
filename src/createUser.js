import fs from 'fs';
import qs from 'querystring';

function createUser() {

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
		console.log(qs.parse(data));
		res.end("Success");
	})
}