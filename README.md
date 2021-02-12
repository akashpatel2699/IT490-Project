# Math Placement Test
Our team of four students have decided to create a math placement site that will assist incoming college student to determine their first semester math class.

---

## Technology Stack
* [Docker](https://www.docker.com/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [Python](https://www.python.org/)
* [Next.js](https://nextjs.org/)
* [Typescript](https://www.typescriptlang.org/)

---

## Versions
* Python 3.9.1
* RabbitMQ 3.8.11
* Node 15.7.0

---

## Application Architecture 

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBpZDIoRnJvbnRFbmQpIC0tPiBpZDMoTWVzc2FnaW5nKVxuICAgIGlkMyhNZXNzYWdpbmcpIC0tPiBpZDQoQmFja0VuZClcbiAgICBpZDQoQmFja0VuZCkgLS0-IGlkMVsoRGF0YWJhc2UpXVxuICAgIGlkMVsoRGF0YWJhc2UpXSAtLT4gaWQ0KEJhY2tFbmQpXG4gICAgaWQ0KEJhY2tFbmQpIC0tPiBpZDMoTWVzc2FnaW5nKVxuICAgIGlkMyhNZXNzYWdpbmcpIC0tPiBpZDIoRnJvbnRFbmQpXG4gICAgICAgICAgICAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBpZDIoRnJvbnRFbmQpIC0tPiBpZDMoTWVzc2FnaW5nKVxuICAgIGlkMyhNZXNzYWdpbmcpIC0tPiBpZDQoQmFja0VuZClcbiAgICBpZDQoQmFja0VuZCkgLS0-IGlkMVsoRGF0YWJhc2UpXVxuICAgIGlkMVsoRGF0YWJhc2UpXSAtLT4gaWQ0KEJhY2tFbmQpXG4gICAgaWQ0KEJhY2tFbmQpIC0tPiBpZDMoTWVzc2FnaW5nKVxuICAgIGlkMyhNZXNzYWdpbmcpIC0tPiBpZDIoRnJvbnRFbmQpXG4gICAgICAgICAgICAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

---

## Run this application on Docker
1. **MUST** have [Docker](https://docs.docker.com/get-docker/) installed on your local machine to run this successfully.
2. **MUST** have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed before advancing to **next step**
3. Get started by cloning this repository on your machine by typing 
```bash
git clone https://github.com/akashpatel2699/IT490-Project.git
```
4. change to the clone directory by typing `cd IT490-Project` 
5. Create .env file to store environment variables by typing `touch .env` command on the terminal. Then open the file with your favorirate text editor and insert following variables with appropriate values.
  
```
  MSG_USER=<messagingUsername>
  MSG_PASS=<messagingPassword>
```
6. At this point, we assumed **Docker** is up and running and **docker-compose** is installed on the machine. If answer to those questions is *Yes* then you can move forward or else check out the **Q&A** section to find your answer to those questions.
7. To bring the application and all the services up , type the following command from the root directory(location where docker-compose.yml is placed) and -d flag will run it in the background and to makesure all the services is up you can type `sudo docker ps`
```bash
docker-compose -d up
```
8. To check the running application, enter `http://localhost:3000` in your web browser
9. To stop the serivces or containers, type `docker-compose stop` and this will stop services started by the *docker-compose* command

---

## Team Members
* Noura Hedhli
* Noor Baryah
* Rut Patel
* Akash Patel

---

## Q&A
Q. How to install **Docker** on the machine?  
A. You can install docker based on your Operating System by visiting and following the instruction found on the [Docker site](https://docs.docker.com/get-docker/)

Q. How to check if the **docker-compose** is installed on the machine?  
A. Type the command `docker-compose` in the terminal and if the output is *command not found* or something similar then you need to install by visiting [docker compose site](https://docs.docker.com/compose/install/)
