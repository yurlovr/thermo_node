#!/bin/bash
PORT=3000


IMAGE="test-image"
CONTAINER="test"
PARAMS="-p $PORT:$PORT"
PARAMS="$PARAMS --restart=always"
PARAMS="$PARAMS -e PORT=$PORT"


# stop & remove previous
docker stop "$CONTAINER"
docker rm -f "$CONTAINER"
docker rmi -f "$IMAGE"


# build & run
docker build -t "$IMAGE" .
docker run --name "$CONTAINER" $PARAMS -d "$IMAGE"
