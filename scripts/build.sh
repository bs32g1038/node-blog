cd react-blog
NODE_OPTIONS=--max_old_space_size=300 CI=false yarn run build
cd ../node-blog-api
yarn run test:e2e:cov
codecov
CI=false yarn run build
cd ../react-admin
CI=false yarn run build
cd ../react-music-app
CI=false yarn run build