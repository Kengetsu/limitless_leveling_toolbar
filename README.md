# shinobi_chronicles_toolbar
Old shinobi chronicles toolbar.

It's only working in Firefox or Safari due to SameSite cookie defaulting to LAX in Chrome/Edge.

This can be resolved by doing the following:
Video Link: https://i.imgur.com/U8WFBVh.mp4

Open this link https://shinobichronicles.com
Open the developer console (F12)
Paste the following into the console: document.cookie = document.cookie + ";path=/;Secure=1;SameSite=None";


If you want to use it on a local instance just change the href in index.html, cp.html, and hotkeys.html then URL_ROOT var in functions.js to be localhost instead of shinobichronicles.com.

Requirements to run local:
NodeJS

Run npm install then from the terminal you can npm start to run the local http-server on localhost:8080