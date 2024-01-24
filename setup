#!/bin/bash
set -e

cd "${BASH_SOURCE%/*}/frontend"

printf "Setting up Node.js environment\n\n"

# TODO: fix dependencies in package.json. Ignore NODE_ENV for now.
yarn install --production=false

cd ../backend

printf "\nSetting up Python environment\n\n"

if [ "$NODE_ENV" != "production" ]
then
  pipenv install --dev
else
  pipenv install
fi

cd ..
