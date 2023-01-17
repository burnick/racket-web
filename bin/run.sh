#!/bin/sh
git pull

yarn install

yarn run build

echo "Successfully built the racket-web"


echo "Restarting serice"
sudo systemctl restart racketweb.service