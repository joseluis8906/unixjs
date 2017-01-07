#!/bin/sh

cd ./frontend/
./make_unixjs.sh
cd ../

git add .
#git commit -m "$1"
git commit -m "update"
git push origin master
