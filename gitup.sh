#!/bin/sh

cd ./frontend/
./make_unixjs.sh
cd ../

if [ "$1" = "local" ];
then
    git add .
    git commit -m "update"
elif [ "$1" = "remote" ];
then
    git push origin master
fi
