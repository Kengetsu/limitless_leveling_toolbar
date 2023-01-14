# shinobi_chronicles_toolbar
Old shinobi chronicles toolbar.

It's only working in Firefox or Safari due to SameSite cookie defaulting to LAX in Chrome/Edge.

This can be resolved by doing the following:
Video Link: https://i.imgur.com/U8WFBVh.mp4

Open this link https://shinobichronicles.com
Open the developer console (F12)
Paste the following into the console: document.cookie = document.cookie + ";path=/;Secure=1;SameSite=None";


If you want to use it on a local instance just change the host in functions.js to be localhost instead of shinobichronicles.com.
