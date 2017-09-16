# Mini Docs
A simplistic rich text editor desktop app with filing structures and live collaboration features.
* Right, left, & center alignment, bold, italics, underline, strikethrough, bullets, numbering, colorpicker etc.
* Document sharing and live collaboration
* Saving and filing system

## Demo
![alt text](https://github.com/rlietrom/miniDocs/blob/master/shortvideo.gif)

## Built Using...
* Electron
* Draft.js
* React
* MongoDB
* Material UI
* AJAX http requests
* Passport authentication
* Express
* Socket.io

## Learning Points
Draft.js is all about managing editorState and its 'richUtils'. From there, it'll do all of the heavy lifting in terms of cursors, typed content, highlighting, and saving styling. For more custom styling options (like color or bulleting) , you'll have to dig deep into its example files to see how to access some of these functions. 

Why use webpack? React uses JSX syntax but the desktop doesn’t understand it. Also, it’s nice to be able to ‘require’ things.

React component organization: it's best to call helper functions in the Render() instead of having a huge, working one. We used HashRouter to route the different component files. 

Using a UI framework is incredible for spending minimal time on UI and barely touching that .css file. Why hadn't I heard of this before? It works really easily with React and can be customized (that's how we got that purple!)

Backend stuff: Hella routes and object manipulation is necessary for tracking a user, its documents (original and shared), and its document's contents. We ended up making a sharedDocs: {} object on each user to track which documents it's added to its collection. Documents are shared and access by the document's unique ID given by MongoDB. Nothing too crazy here and passport authorization was long as usual. 

Git flow and teamwork: went so smoothly! This time, we all had gone through working on a big project with a team so git flow wasn't crazy and the delegation was equal. Pull Requests and standups every few hours were key. 

## Authors

Reed Feldman | Ryan Clyde | Carlie Ostrom | Jilani Ghafur




