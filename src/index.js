import express from 'express';
import fs from 'fs';
import {createPageHandler} from './createUser.js'

import {loginPageHandler} from './login.js'
import {logoutPageHandler} from './logout.js'
import {groupPageHandler, eventInfoHandler, registerForGroupPageHandler, leaveGroupPageHandler, createGroupPageHandler, getGroupMembersHandler} from './groupHandler.js'
import {authHandler} from './authHandler.js'
import {profileHandler} from './profileHandler.js'
import {emailAuthHandler} from './emailAuthHandler.js'

const app = express();
const port = 3000;

app.use(express.static('src/app/public'));

app.get('/', (req, res) => {
  res.end(fs.readFileSync('src/app/public/index.html'))
})
app.get('/emailAuth', emailAuthHandler)
app.post('/create.html', createPageHandler);
app.post('/login.html', loginPageHandler);
app.post('/events.html', groupPageHandler);
app.post('/eventInfo.html', eventInfoHandler);
app.post('/registerForEvent.html', registerForGroupPageHandler);
app.post('/leaveEvent.html', leaveGroupPageHandler);
app.post('/createEvent.html', createGroupPageHandler);
app.post('/getGroupInfo.html', getGroupMembersHandler);
app.post('/logout.html', logoutPageHandler);
app.post('/profile.html', profileHandler);
app.post('/auth', authHandler);

app.listen(port, () => {
  console.log(`AvengeHers app listening on port ${port}`)
})
