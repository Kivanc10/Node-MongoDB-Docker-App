# Node-MongoDB-Docker-App

A simple and robust Node-Express app supported by MongoDB and Docker. It is a type of task-manager app. It is composed of a set of authenticate, database operations, and REST-API operations.



## Getting Started With Docker Containers

1- Install Docker for Windows,Docker for Linux or Docker For Mac
  - <a href="https://docs.docker.com/docker-for-windows/install/" target="_blank">Install Docker for Windows</a>
  - <a href="https://docs.docker.com/docker-for-mac/install/" target="_blank">Install Docker for Mac</a>
  - <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">Install Docker for Ubuntu</a>
  - <a href="https://gist.github.com/sethbergman/9ef9d14aef86ba7705791785ed377f69" target="_blank">Install Docker for Linux Mint</a>


2- Open a command prompt and check out with `node.dockerfile` whether Docker has been installed or not.



 ## Running the Application With Docker Compose
 
 1- After the Docker installation,open a command prompt at the root of the the application's folder.
 
 2- Run `docker-compose build`
 
 3- Then, run `docker-compose up`
 
 4 - You can look at the container features with `docker ps -a`
 
 5 - At last, the application is available on port 8080. Navigate to http://localhost:8080/
 
 6- You can run `docker-compose down` to stop and remove existing the container
 
 

## Runnning the Application With Node.js and MongoDB (without Docker)

1 - <a href="https://docs.mongodb.com/manual/installation/">Install and start with MongoDB</a>

2 - <a href="https://nodejs.org/en/download/">Install the last version of Node.js</a>

3 - Run npm install

4 - You must change something to prevent getting error. 

  - You must change something to prevent getting errors. Open db/mongoose.js file in the repository and type `http://127.0.0.1/` instead of the `mongo`. Thus, you can connect successfully with node.js to the MongoDB database
  - 
5 - `npm start` to start the server

6 - At last, navigate to http://localhost:8080/

## Informing about the Using

1 - If you were signed up already then `GET` request to http://localhost:8080/users/me to see your notation at database

2- If you get the error message like `please authenticate` from the program, then you should be authenticated.
  - The first thing you should do is `sign up` for the app via `POST` request to localhost:8080/users
      - There is a sample request body for `sign up`:
          ```JavaScript
          {
            "name" : "Kivanc Aydogmus",
            "email" : "kivanc@example.net",
            "password" : "samplePswrd@!!"
          }
          ```
  - The next step you'll achieve should be log in the app with your current account. You can do this by `POST` request to localhost:8080/users/login
  - After the `logged in`, you can create tasks about anything by a `POST` request to localhost:8080/tasks. Also, you can list all of your tasks by a `GET` request to localhost:8080/tasks.
    - There is a sample request body for create task:
        ```JavaScript
             {
               "description" : "complete the node.js app with docker",
               "completed" : "true"
            }
        ```

    - Also you can query to list task by its `completed` status:
      - `GET` request to http://localhost:8080/tasks/?completed=true to list all completed tasks
      
      - `GET` request to http://localhost:8080/tasks/?completed=false to list all uncompleted tasks

### Some Necessary Session Instructions(If you have already logged in)

 - You can log out your last session by a `POST` request to http://localhost:8080/logout
 - If you want to log out all of your session, then you should `POST` request to http://localhost:8080/logoutAll
 - You can select/arrange your avatar image by `POST` at `/users/me/avatar`. Also you can view your avatar image by `GET` at `/users/:id/avatar"`. id represent the user id you registered.
