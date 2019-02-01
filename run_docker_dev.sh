docker run \
  -it \
  --name=unixjs \
  -p 3000:3000 \
  --volume $(pwd):/app \
  -d node:8.12.0-stretch bash