if [ -f .env ]; then
  export $(cat .env | xargs)
fi

docker run \
--rm \
--network="nemesis-docker_default" \
-e SONAR_HOST_URL="http://sonarqube-dev:9000"  \
-e SONAR_TOKEN="${SONAR_TOKEN}" \
-v ".:/usr/src" \
sonarsource/sonar-scanner-cli
