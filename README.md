# Doodle Drop

[My Notes](notes.md)

This application will allow the user to draw something, save it to a "gallery", and share it with others.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Looking for a way to easily create art and share it with others? It doesn't matter if you are starting out on your art journey, like drawing for fun, or a professional artist! Doodle Drop is for anyone. You can save your art to your personal "Gallery" and share it with family and friends. Drawing has never been so effortless and enjoyable.

### Design

![An image of the way the website will work, showing the login screen, the canvas screen, the gallery, and the place where you share the image with someone via email or phone number.](https://github.com/user-attachments/assets/f0aec749-36d0-49b4-a002-40c0df8bbdd1)


Here is how users would interact with the backend...
![An image of the way users could interact with the backend](https://github.com/user-attachments/assets/855ca8b4-a208-4d22-ab49-1e8042c9f6d2)


### Key features

- Login
- Save to gallery
- View gallery
- Share with others
- The color options and clear on the canvas

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I would use HTML to create the drawing canvas and the various buttons. There will be four HTML pages. One for the login, another for the canvas, and the other two for the gallery and sharing with another person.
- **CSS** - I would use CSS to allow the user to change colors and to clear the canvas. I would also use it to make the website pretty :). 
- **React** - I would use this for login, sharing, and displaying previous images in the gallery
- **Service** - Login and sharing drawings.
- **DB/Login** - Stores user login information and securely storing them.
- **WebSocket** - Sharing the images/drawings with others.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://260project.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I added the HTML for the pages index.html, draw.html, gallery.html, and share.html
- [x] **Proper HTML element usage** - Start tags. End tags. Labels and ids. The works :). 
- [x] **Links** - I made it so the user can navigate to parts of the web page through links at the top and sometimes through buttons at the bottom.
- [x] **Text** - There is text explaining what the user should do and their choices throughout the web page. An example of this is when the user has to enter in an email or login info.
- [x] **3rd party API placeholder** - There are a few placeholders (in the gallery and in share) where the user's image will eventually be.
- [x] **Images** - There are several images that act as placeholders (the user for the website will have their own drawing that will eventually go there).
- [x] **Login placeholder** - There is a place where the user can log in/register
- [x] **DB data placeholder** - There is a way to login/register.
- [x] **WebSocket placeholder** - The user can enter an email to which their drawing will be shared.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - The headers, footers, and main styling for the body all look the same throughout the webpage. This includes background color, font-family, other colors, alignment, etc.
- [x] **Navigation elements** - I styled the navigation elements to all look the same as well. When you hover over the links, they change colors. I also used bootstrap when making the buttons, which also take you to various pages or will allow you to do things like share the image with someone.
- [x] **Responsive to window resizing** - I used flex on almost every page and grid on the gallery page. Bootstrap also helped with this.
- [x] **Application elements** - I styled the buttons and the dropdowns. They are aligned.
- [x] **Application text content** - There are labels and descriptions throughout the webpage. When the user is prompted to type something, a prompt shows up in the text box (ex: typing in an email so they can share the drawing).
- [x] **Application images** - I made a little background for the placeholder images that matches the background of the canvas (aliceblue).

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Installed and used Vite
- [x] **Components** - Had to rework the html and css quite a bit, especially when I couldn't figure out how to do the bootstrap buttons (I eventually did) or when I realized that the way I had formatted my files wasn't quite correct.
- [x] **Router** - Component routing was fairly easy, but it took a while as I have never done anything like that before.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Making the canvas actually draw correctly and the images replacing the placeholder images was pretty difficult, and I had to consult google and AI, but I did eventually get it working. One thing that I did was make it so when the user hasn't logged in yet, they can't click on the links in the navigation bar to get around the site. It was a bug that I noticed while testing.
- [x] **Hooks** - Used hooks to draw on the canvas (useRef, useEffect) , saving images to gallery, mouse position for drawing, etc. 

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Created a backend server to handle login/logout and user authentication using Node.js and Express.
- [x] **Static middleware for frontend** - Served the frontend using Express static middleware
- [x] **Calls to third party endpoints** - Used 7Weather to get the weather to show up on the login page. I thought this would be funny because people can think "Oh, it's warm outside, I should go out and take a walk or something instead of being on technology."
- [x] **Backend service endpoints** - Implemented endpoints for user creation, login, and logout with authentication
- [x] **Frontend calls service endpoints** - Integrated frontend with backedn service endpoints for user authentication.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
