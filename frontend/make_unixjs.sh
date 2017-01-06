#!/bin/sh

#unixjs
echo "making unixjs.js"

cat lib/sha.min.js > unixjs.js
cat lib/croppie.min.js >> unixjs.js
cd lib/gwt/
./make_gwt.sh
cd ../../
cat lib/gwt.min.js >> unixjs.js
#cat boot/build/boot.min.js >> unixjs.js
cd boot/
./make_boot.sh
cd ../
cat boot/initrc.min.js >> unixjs.js
#cat bin/build/bin.min.js >> unixjs.js
cd bin/
./make_bin.sh
cd ../
cat bin/bin.min.js >> unixjs.js

echo "unixjs.js maked"