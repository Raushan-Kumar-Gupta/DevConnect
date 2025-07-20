## deployment
    -signup on aws 
    -Launch instance
    -chmod 400 <secret>
    -ssh i into my machine
    -install curl-node with version
    -git clone repo
# Frontend
    -npm install
    -npm run build
    -sudo apt update
    -sudo apt install nginx
    -sudo systemctl start nginx
    -sudo systemctl enable nginx
    -copy code from dist(build files) to /var/www/html/
    -sudo scp -r dist/* /var/www/html
    -enable port 80 of instance

# any changes in frontend again we need to repeat
    -npm run build
    -sudo scp -r dist/* /var/www/html


## Backend
    -install npm
    -npm install pm2 -g
    -pm2 start npm -- start
    command : -pm2 logs, pm2 list, pm2 flush<name>, pm2 stop<name>, pm2 delete <name>
    #-> nginx proxy-pass
    giving Name: pm2 start npm --name "<name>" --start
#       nginx config:
            -sudo nano /etc/nginx/sites-available/default
            -sudo systemctl restart nginx
    modify the BaseURL in frontend project to "/api"




## important 
    dns, name server