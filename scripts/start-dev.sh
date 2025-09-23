#!/bin/bash

# start backend
cd server/InsuranceAPI
dotnet run &
BACKEND_PID=$!

# start frontend
cd ../../client
ng serve

# when ng serve finishes, kill backend too
kill $BACKEND_PID
