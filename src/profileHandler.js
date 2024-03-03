import manageProfile from 'manageProfile';

export function profilePageHandler(req, res) {
	let data = '';
    req.on('data', (d) => {
        data += d.toString();
    })
    req.on('end', () => {
        data = qs.parse(data);
        data.authCode = hash(data.authCode);
        if (checkAuth(data.email, data.authCode)) {
            res.status(200);
            let stats = manageProfile.getStats(data.email);
            res.end(JSON.stringify(stats));
        } else {
            res.status(403);
            res.end("Invalid");
        }
    })
}