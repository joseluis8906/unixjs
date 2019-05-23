docker run \
  -it \
  --name=unixjs \
  -w=/app \
  -p 3000:3000 \
  --volume $(pwd):/app \
  -d node:10.15.3-stretch bash