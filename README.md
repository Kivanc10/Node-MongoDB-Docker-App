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


`Sample python code to use that api correctly. This pieces of code allows you to figure out how the api works and what I should do to using.`


```Python
import requests

url = "http://104.248.128.69:8080"


url_register = url + "/users"
url_sign_in = url + "/users/login"
url_show_me = url + "/users/me"
url_add_task = url + "/tasks"
url_show_tasks = url + "/tasks"
url_log_out = url + "/users/logout"

data = {
    "name": "Micheal Foster",
    "email": "micheal_foster15@gmail.com",
    "password": "samplePassword_1==*?@!!"
}

def register(url,data):
    response_json = {}
    r = requests.post(url = url,json=data)
    if (r.status_code == 201):
        print("The sign-up operation has been completed succesfully")
        response_json = r.json()
    else:
        print("Status code --> ",r.status_code)
        print("There is something wrong over there -> ",r.text)
    return response_json


def signIn(url,data):
    response_json = {}
    r = requests.post(url = url,json=data)
    if r.status_code == 200:
        print("The sing-in operation has been completed succesfully")
        response_json = r.json()
    else:
        print("Status code --> ",r.status_code)
        print("There is something wrong over there -> ",r.text)
    return response_json

# to sign up
sign_up_resp = register(url_register,data)
# to sign in
sign_in_resp = signIn(url_sign_in,data)
# store the tokens to keep logged in
myTokens = []

myTokens.append(sign_up_resp["token"])
myTokens.append(sign_in_resp["token"])

print(myTokens)

# headers object needs to token
headers = {
    "Authorization" : myTokens[0]
}

# show me
def showMe(url,headers):
    """
    this func allows us to get the user infos
    """
    r = requests.get(url,headers=headers)
    if r.status_code == 401:
        print(r.text)
    else:
        print("Authentication was completed succesfully")
        print(r.json())

# log out
def logOut(url,headers):
    """
    this func allows us to log out the all of sections belong to the user
    """
    r = requests.delete(url,headers=headers)
    if r.status_code == 500:
        print("Log out operation did not succesful")        
    else:
       print("The user is deleted succesfully")


def addTaskToUser(url,data,headers):
    """
    this func allows us to add task to the user
    """
    r = requests.post(url = url,json=data,headers=headers)
    if r.status_code == 201:
        print("The task is appended succesfully to the user")
        print(r.json())
    else:
        print("An error occured when the task is appended")
        print(r.json())

def showTasks(url,headers):
    """
    this func allows us to sow all tasks belong to the user
    """
    r = requests.get(url,headers=headers)
    if r.status_code != 500 | 404 | 400:
        print("Tasks --> \n")
        print(r.json())
    else:
        print("An error occured")
        print(r.text)

task = {
    "description" : "I'm using the my rest api",
    "completed" : "true"
}

showMe(url_show_me,headers)
addTaskToUser(url_add_task,task,headers)
showTasks(url_show_tasks,headers)
logOut(url_log_out,headers)
```


