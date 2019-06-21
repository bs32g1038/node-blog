rm -rf .gitignore
rm -rf .travis.yml
dockerfile="
FROM node:10.16.0-alpine\n
WORKDIR /code\n
COPY ./package.json /code\n
RUN yarn install --production\n
COPY . /code\n
"
echo -e $dockerfile"\nEXPOSE 8080" > node-blog-api/dockerfile
echo -e $dockerfile"\nEXPOSE 3002" > react-admin/dockerfile
echo -e $dockerfile"\nEXPOSE 3000" > react-blog/dockerfile
echo -e $dockerfile"\nEXPOSE 7000" > react-music-app/dockerfile
echo "
.cache
node_modules
*.lock
*.log
" > .gitignore
git add --all .
git commit --message "Automatically update from travis-ci"
git push --force "https://${GH_TOKEN}@${GH_REF}" HEAD:deploy