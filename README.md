# 3D File Sharing Social Network
This is an educational project. The main idea is to demonstrate how one can build a  scalable social network using Node.js, React, and Sql with Javascript. 

## Tech/framework used
This is a full stack project, the backend end uses Node.js with Express, and a MySql database. The frontend is React, with redux utilized for state management. 

## Features
Home Page:
See the designs, and download files from your friends, and those that you follow on the network!

Discover Page:
Gives you the opportunity to find new people, and discover popular posts on the network. 

Discover People: 
Discover other 3D print designers, follow them, and use their designs!



## Installation
1. Clone the project
2. Cd into server and npm install
3. Cd into client folder and npm install
4. Cd back into server

##Getting Started
Now that the project is installed with dependencies, Download your preferred solution stack for hosting Sql Servers (MAMP, WAMP, XAMPP).
1. Start your solution stack, and navigate to localhost/phpmyadmin and log in 
2. Create a table with the included DB_Creator SQL file. 
3. Create .ENV file in the project’s root directory
    - Env file should contain:
      i. DATABASE = (name of database in phpmyadmin)
     ii. DATABASE_HOST = (should be localhost if running on local machine)
    iii. DATABASE_USER = (username for sql server)
     iv. DATABASE_PASSWORD = (password for sql server)
    
##Running the Project 
1. inside of /server run command npm run dev 
2. frontend will start on localhost:3000 and Backend will start on localhost:5000
     
     
