#!/bin/bash

# Start the backend server in a new terminal
xterm -e "cd backend && nvm use --lts && npm run start" &

# Start the frontend server in a new terminal
xterm -e "cd client && yarn start" &
