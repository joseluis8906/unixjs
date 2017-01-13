#!/bin/sh

echo "making bin.js"
cat desktop.js > bin.js
cat login.js >> bin.js
cat block.js >> bin.js
cat gcontrol.js >> bin.js
cat gusers.js >> bin.js
#cat domotictrl.js >> bin.js

yuicompressor.sh bin.js
echo "bin.js maked"