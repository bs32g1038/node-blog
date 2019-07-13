set -e

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker-compose -f docker-compose.release.yml build

docker-compose -f docker-compose.release.yml push