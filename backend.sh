#!/bin/sh

pkill kore
cd backend/
kore run &
cd ../
