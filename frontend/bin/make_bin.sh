#!/bin/sh

echo "making bin.js"
cat src/desktop.js > bin.js
#cat src/login.js >> bin.js
#cat src/block.js >> bin.js
#cat src/gpanel.js >> bin.js
#cat src/gcontrol.js >> bin.js
cat src/domotictrl.js >> bin.js

yuicompressor.sh bin.js
echo "bin.js maked"