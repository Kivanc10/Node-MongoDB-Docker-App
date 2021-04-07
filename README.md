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
