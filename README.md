# shinobi_chronicles_toolbar
Old shinobi chronicles toolbar.

Hotkeys Toolbar: https://kengetsu.com/snb/

Working in Firefox or Safari to use in Chrome/Edge/Brave follow steps below.

This can be resolved by doing the following:
Video Link: https://i.imgur.com/U8WFBVh.mp4

Open this link https://shinobichronicles.com
Open the developer console (F12)
Paste the following into the console: document.cookie = document.cookie + ";path=/;Secure=1;SameSite=None";

Brave: Follow the steps above then ensure all cookies are allowed. Do this by clicking the "Brave Shields" (lion icon to the right of url bar) then going to advanced controls then switching "block cross-site cookies" to "Allow all cookies". This needs to be completed on both the game site directly and from the toolbar page.

If you want to use it on a local instance just change the href in index.html, cp.html, and hotkeys.html then URL_ROOT var in functions.js to be localhost instead of shinobichronicles.com.

Requirements to run local:
NodeJS

Run npm install then from the terminal you can npm start to run the local http-server on localhost:8080
