set -e

# 镜像版本
TAG=v2

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t bs32g1038/node-blog-nginx:${TAG} .

docker push bs32g1038/node-blog-nginx:${TAG}