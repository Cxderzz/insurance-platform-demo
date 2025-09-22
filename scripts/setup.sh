#!/bin/bash
echo "Setting up the insurance platform..."

# front end installation
echo "Setting up frontend..."
cd client
npm install
cd ..

# back end restore
echo "Setting up backend..."
cd server
dotnet restore InsuranceAPI.sln
cd ..

echo "Setup complete! Run 'scripts/start-dev.sh' to start the development environment."
