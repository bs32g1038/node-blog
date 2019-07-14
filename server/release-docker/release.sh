set -e

# 镜像版本
TAG=v2

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -f ./release-docker/Dockerfile -t bs32g1038/node-blog-server:${TAG} .

docker push bs32g1038/node-blog-server:${TAG}