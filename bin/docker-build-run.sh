#/bin/sh

export $(grep -v '^#' .env | xargs) && docker build -t racket-web \
--build-arg PORT=$PORT  \
--build-arg APP_SECRET=$APP_SECRET \
--build-arg NODE_ENV=$NODE_ENV \
--build-arg WDS_SOCKET_PORT=$WDS_SOCKET_PORT \
--build-arg NEXT_RECAPTCHA_KEY=$NEXT_RECAPTCHA_KEY \
--build-arg API_URL=$API_URL \
--build-arg FIREBASE_API_KEY=$FIREBASE_API_KEY \
--build-arg FIREBASE_AUTHDOMAIN=$FIREBASE_AUTHDOMAIN \
--build-arg FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
--build-arg FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET \
--build-arg FIREBASE_MESSAGE_SENDER_ID=$FIREBASE_MESSAGE_SENDER_ID \
--build-arg FIREBASE_APP_ID=$FIREBASE_APP_ID \
--no-cache . && docker run --rm -it --network=host -p 8080:8080 racket-web
