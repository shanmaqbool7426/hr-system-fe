#!/bin/bash

# Pull the latest changes from the remote repository
git pull

# Install dependencies
yarn

# Build the project
yarn build


# Restart the PM2 process
pm2 restart all
