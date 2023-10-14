# MERN Ecommerce

## Description

An ecommerce store built with MERN stack, and utilizes third party API's. This ecommerce store enable three main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * Redux Thunk middleware to handle asynchronous redux actions


## Database Seed

* The seed command will create an admin user in the database
* The email and password are passed with the command as arguments
* Like below command, replace brackets with email and password. 
* For more information, see code [here](server/utils/seed.js)

```
npm run seed:db [email-***@****.com] [password-******] // This is just an example.
```

## Demo

This application is deployed on Render Please check it out :smile: [here](https://mern-store.onrender.com).

See admin dashboard [demo](https://mernstore-bucket.s3.us-east-2.amazonaws.com/admin.mp4)

## Install

Some basic Git commands are:

```
$ git clone https://github.com/mohamedsamara/mern-ecommerce.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that include:

  * MONGO_URI & JWT_SECRET
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * MAILCHIMP_KEY & MAILCHIMP_LIST_KEY => Mailchimp configuration
  * MAILGUN_KEY & MAILGUN_DOMAIN & MAILGUN_EMAIL_SENDER => Mailgun configuration
  * GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET & GOOGLE_CALLBACK_URL => Google Auth configuration
  * FACEBOOK_CLIENT_ID & FACEBOOK_CLIENT_SECRET & FACEBOOK_CALLBACK_URL => Facebook Auth configuration
  * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY & AWS_REGION & AWS_BUCKET_NAME => AWS configuration
```

## Start development

```
$ npm run dev
```

## Simple build for production

```
$ npm run build
```

## Run build for production

```
$ npm start
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)


### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:  

```json

    {
      "editor.formatOnSave": true,
      "prettier.singleQuote": true,
      "prettier.arrowParens": "avoid",
      "prettier.jsxSingleQuote": true,
      "prettier.trailingComma": "none",
      "javascript.preferences.quoteStyle": "single",
    }

```
********************facebook , google login  (require https)************************

https://developers.facebook.com/apps/1384613342085063/dashboard/
https://console.cloud.google.com/apis/credentials/oauthclient/141255945481-6agbkeiouvluh3segnb771kajf56sfos.apps.googleusercontent.com?project=onlinequiz-36f0a

callback url : if login is done , facebook or google will redirect to this path , which this defined as route in passport defination .


mailchump:
https://www.youtube.com/watch?v=6jKpsVWrTLQ&t=149s


------------------------------------------------------------Deploy-------------------------------------------

deploy ssh and all project 
pm2 start "node server/index.js" --name=ANE


https://github.com/saasscaleup/nodejs-ssl-server
https://www.youtube.com/watch?v=yhiuV6cqkNs

## Installation instructions

### 1. Launch amazon ubuntu server in aws + Attach Elastic IP to the new instance

### 2. ssh to ubuntu to install packages

```sh
ssh -i <key.pem> ubuntu@<ip-address> -v
```

### 3. Update and Upgrade linux machine and install node and nvm 

```sh
sudo apt update
```

```sh
sudo apt upgrade
```

```sh
sudo apt install -y git htop wget
```

#### 3.1 install node

To **install** or **update** nvm, you should run the [install script][2]. To do that, you may either download and run the script manually, or use the following cURL or Wget command:
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
Or
```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

#### 3.2 Copy & Past (each line separately)
<a id="profile_snippet"></a>
```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

#### 3.3 Verify that nvm has been installed

```sh
nvm --version
```

#### 3.4 Install node

```sh
nvm install --lts # Latest stable node js server version
```

#### 3.5 Check nodejs installed
```sh
node --version
```

#### 3.6 Check npm installed
```sh
npm -v
```

### 4. Clone nodejs-ssl-server repository

```sh
cd /home/ubuntu
```

```sh
git clone https://github.com/saasscaleup/nodejs-ssl-server.git
```

### 5. Run node app.js  (Make sure everything working)

```sh
cd nodejs-ssl-server
```

```sh
npm install
```

```sh
node app.js
```

### 6. Install pm2
```sh
npm install -g pm2 # may require sudo
```

### 7. Starting the app with pm2 (Run nodejs in background and when server restart)
```sh
pm2 start app.js --name=nodejs-ssl-server
```
```sh
pm2 save     # saves the running processes
                  # if not saved, pm2 will forget
                  # the running apps on next boot
```

#### 7.1 IMPORTANT: If you want pm2 to start on system boot
```sh
pm2 startup # starts pm2 on computer boot
```

### 8. FREE SSL - Install Nginx web server

```sh
sudo apt install nginx
```

```sh
sudo nano /etc/nginx/sites-available/default
```

#### Add the following to the location part of the server block

```sh
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

##### Check NGINX config
```sh
sudo nginx -t
```

##### Restart NGINX
```sh
sudo service nginx restart
```

#### You should now be able to visit your IP with no port (port 80) and see your app. Now let's add a domain

### 9 Add domain in goDaddy.com
If you have domain, you can add A record to your EC2 instance IP with a new subdomain as I'm going to show you next

#### 9.1 Check that Port 80 redirect to Nodejs server

### 10 Installing Free SSL

#### 10.1 Installing Certbot

```sh
sudo snap install core; sudo snap refresh core
```

```sh
sudo apt remove certbot
```

```sh
sudo snap install --classic certbot
```

```sh
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

#### 10.2 Confirming Nginx’s Configuration
```sh
sudo vim /etc/nginx/sites-available/default
```

let edit this line:
```sh
...
server_name example.com www.example.com;
...
```

```sh
sudo nginx -t
```

```sh
sudo systemctl reload nginx
```

#### 10.3 Obtaining an FREE SSL Certificate
```sh
sudo certbot --nginx -d app.example.com 
```

Output:
```
IMPORTANT NOTES:
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/your_domain/fullchain.pem
Key is saved at: /etc/letsencrypt/live/your_domain/privkey.pem
This certificate expires on 2022-06-01.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
* Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate
* Donating to EFF: https://eff.org/donate-le
```

#### 10.4 Verifying Certbot Auto-Renewal
```sh
sudo systemctl status snap.certbot.renew.service
```
Output:
```
○ snap.certbot.renew.service - Service for snap application certbot.renew
     Loaded: loaded (/etc/systemd/system/snap.certbot.renew.service; static)
     Active: inactive (dead)
TriggeredBy: ● snap.certbot.renew.timer
```

To test the renewal process, you can do a dry run with certbot:

```sh
sudo certbot renew --dry-run
```

### 11. Visit your website HTTPS://<your website>
  Enjoy Your free Nodejs server with Free SSL :)
  


Method 2 :

1- create instance in ec2 (aws) , should create security group and allow all inbound and outbound to can access public ip
and then for network interface add this group
2- connect to the instance 
3- run command :
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh  //activate nvm

install node.js:
nvm install v16.16.0 

install git:
sudo apt-get update -y
sudo apt-get install git -y



git clone https://github.com/amrfahmy5/ANE.git


``
---------------------------------------------------------------------------------------
**********************link aws(es2) ane namecheap***********************************
solution:https://www.youtube.com/watch?v=VedY6EjOBWM
1-create elastic ip for instance 
2-route 53 make zone and add ip (1) and make a route with ip and the domain
3- in namecheap add the route (4 custom dns got from aws)



---------------------------------------------------------------------------------

-------------------------------------------------------------------------------
        ********************* problems ***********************
ec2 :
problem 1 : the instance is sleep after the ssh connection is closed
solution :  (screen, nohup, or tmux)

run in background and see the log : (should switch to root user first)
https://stackoverflow.com/questions/21193988/keep-server-running-on-ec2-instance-after-ssh-is-terminated
https://saturncloud.io/blog/keeping-your-server-running-on-an-ec2-instance-after-ssh-is-terminated/
tmux new -s my_session
npm run start
ctrl + B  d 

when open the ssh connection (will back you to prev tmux) : tmux attach
to close last tmux and run new one : tmux attach -d
alias for it : alias tt='tmux attach -d' then run (tt) 
 


problem 2 : remove port no 3000 requirement from aws ec2 instance
solution :
https://stackoverflow.com/questions/38880040/remove-port-no-3000-requirement-from-aws-ec2-instance
bcs every time i should write the ip then :3000 so it forward to 80 (base port)
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
