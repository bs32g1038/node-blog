set -e

# 镜像版本
TAG=v3

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -f ./docker/Dockerfile -t bs32g1038/node-blog:${TAG} .

docker push bs32g1038/node-blog:${TAG}