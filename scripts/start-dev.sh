#!/bin/bash

# start backend
cd server/InsuranceAPI
dotnet run &
BACKEND_PID=$!

# start frontend
cd ../../client
npm start

# when npm start finishes, kill backend too
kill $BACKEND_PID
