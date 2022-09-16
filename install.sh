!/bin/bash


echo "INSTALA O CURL"
sudo apt install curl -y 

echo "BAIXA E INSTALA O NODE 16+"
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash - 
sudo apt install nodejs -y 

npm install 

npm run build 

echo "rm -rf install.sh && start.sh" >> start.sh

chmod 777 start.sh

./start.sh