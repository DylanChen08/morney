#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>


git remote add origin git@github.com:DylanChen08/morney-website.git
git branch -M main
git push -f origin main
#以下是旧版命令
#git push -f git@github.com:DylanChen08/morney-website.git main:gh-pages
cd -