# AvengeHers

## If you wish to run the site locally:
Install npm and node.js on your computer

cd into directory

cd into AvengeHers folder

Using terminal, run npm install

run npm test

in browser of choice, search http://localhost:3000

## Or, if online is more your thing...
[Access the replit here](https://replit.com/@dhm0/AvengeHers)

Note that in order for all functionality to work correctly, you must open it in an external tab (not the built-in replit webview tab)

Try making an account, logging in, and making and joining a group.

## Inspiration
Our inspiration comes from our own personal experiences having to walk somewhere alone at night, often feeling unsafe or disconnected. Because we notice and face this problem regularly, we knew our product would help this issue in some way or another, and in a way that is accessible to everyone on a college campus.

## What it does
The app allows individuals to look at events that they’re going to and find other people who are walking there and back to create a group-walk, thus making the experience a safer and more fun one. Individuals can go to events, find the event they are planning on attending or making one if there is no entry for it, and then either add themselves to a group walk or create a new walk from a different starting location. The app is completely functional and easy to use.

## How we built it
We used HTML and JavaScript as our two primary languages, splitting into two groups of two, one tackling the front-end and the other tackling the back-end.

The backend runs on Express.js, and interacts with the framework-less HTML, CSS, and vanilla JavaScript frontend using a custom RESTful API. To be a little more detailed, all "user" data is handled by the backend, and can be requested by the frontend at a series of different URLs, with handlers split not just by URL location but also by request type (GET/POST). Data is exchanged in standardized JSON formats for easy data access on both sides.

## Challenges we ran into
Because we all were working of a variety of different things all at once, multiple we times we ran into issues of people having differing code that then gets stuck in merge conflicts when we pushed our changes to GitHub. We spent a lot of time working through there merge conflicts and ensuring our progress wasn't getting deleted.

## Accomplishments that we're proud of
We are incredibly proud of the final product. While we had a lot of goals and expectations in mind starting the project, we were able to focus and prioritize on what we specifically wanted to tackle during the duration of this project.

## What we learned
We learned a lot about working together on a full and complete web application. While many of us had experience in working on different parts of web appl development, we definitely struggled with merging the front-end work and back-end work together in a cohesive and effective way. We spent a lot of time on this, but we learned a lot from the process.

## What's next for AvengeHers Walkshare
In terms of our application, we are planning to implement a portion to our app where individuals can find other people walking similar routes as them even if there is no specific event happening. For example, if someone was out late studying, they could find someone who is walking back in a similar direction as them so they won't need to walk back alone late at night. Additionally, we also hope to make the software publically available and easily customizable to be hosted by individuals at different universities on Raspberry PIs.

## Images
![plot](images/Home%20Page.png)
![plot](./images/Create%20Account%20Page.png)
![plot](images/Login%20Page.png)
![plot](images/Event-InnovateHer.png)
![plot](./images/Event%20Info%20Page.png)
![plot](images/Profile%20Page.png)
