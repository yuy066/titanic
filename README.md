# Titanic 

This project is a tool that show details of passengers on the Titanic. It enables a user to search
for passenger information by name, add notes about this passenger, and delete notes. It also displays
two chart based on the thoughts that more women were alive than men and more people with better ticket type alives.

# Steps to run the project

## 1.Install node packages

Run `npm install` to install all required node packages.
Run `cd src/api`, `npm install` to install server side packages

## 2. Reset database

`cd ../../` to navigate back to titanic folder level.
Run `npm run resetDB` to reset database.

## 3.Run server

Run `npm run server` for a dev server. 

## 4.Run Project

Open another terminal and run `npm run build`.
Run `npm run start`. Navigate to `http://localhost:4200`.

# User Guide for some page

1. In note dialog, note that does not add to the note list if add button is not clicked. And 
   all information in the note would be removed once the dialog is closed.
2. Instead of having a close button in note dialog, I chose to let the dialog close when 
   the user click anywhere out of the dialog.
3. Enter empty note will throw an error
4. In Passenger List, the search by name function works with upper and lower case
5. There is one issure with the routing and if you refresh the /passenger-list page, it might
not work so just go back to /home or /chart and navigate back from the top bar. 

# More to improve

1. Server and client communication. I am not familiar with express so later I will learn more
about how to connect Express and Angular.For now I just run the server first and use proxy server
to run the client. I am not sure what happen to the deletenotes api since it returns ok and it 
deletes the selected note but it throws error about parsing the url. I will investigate more on it.

2. Unit testing on components with karma-jasmine. I didn't do this for now because it is not a part
of the requirement.

3. Add edit notes feature in note dialog. I didn't add this feature for now because it might not make sense if the user can edit the note back and forth and it is not included in the requirment.  

4. Add paginaion for passenger list. I didn't do this for now because we have a search function
so if the user want some passenger info, he or she can just search for it and add notes. It is 
faster than having pagination since they don't even need to scroll. However, having a pagination
makes the page cleaner and reduce the height.